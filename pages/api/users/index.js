// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import "dotenv/config";
import { ObjectId } from "mongodb";
import SONAR from "../../../src/backend/SONAR";

import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
import { LOGGED_IN_USER, VALIDATION } from "../../../src/tools/constants";
import { validate } from "../../../src/backend/validation/userSchema";
import saltHashPassword, {
  getHash,
} from "../../../src/backend/authentication/crypto";
import { HttpResponder } from "../../../src/tools/HttpResponder";
import { unstable_getServerSession } from "next-auth/next";
import { AUTH_OPTIONS } from "../auth/[...nextauth]";
import { validateInterest } from "../../../src/backend/validation/interestSchema";
import { validateIntPoint } from "../../../src/backend/validation/pointSchema";

const CURRENT_MATCH = (id) => [
  {
    $match: {
      _id: new ObjectId(id),
    },
  },
  {
    $project: {
      matches: {
        $arrayElemAt: ["$matches", "$index"],
      },
    },
  },
  {
    $project: {
      _id: "$matches._id",
    },
  },
];

const handler = nextConnect();

handler.use(middleware);

//Matches have to be calculated here.
//find one limit 1 or skip 1 to get to your page.
handler.post(async (req, res) => {
  try {
    const valid = validate(req.body);
    if (!valid)
      return HttpResponder.BAD_REQ(res, { msg: validate.errors[0].message });

    const usersColl = req.db.collection("users");

    const checkIfUserExists = await usersColl.findOne({
      email: req.body.email,
    });

    if (checkIfUserExists)
      return HttpResponder.CONFLICT(res, { msg: "User already exists." });

    const interests = await getInterests(req);

    //Find matches according to interest
    const matches = await SONAR.matches(req.db, interests);

    const passwordSH = saltHashPassword(req.body.password);

    //Insert user with interests and matches
    const ack = await usersColl.insertOne({
      name: req.body.name,
      email: req.body.email,
      interests,
      matches: matches.map((match) => ({ _id: match._id, interest: 0 })),
      profileImg: req.body.img || "",
      index: 0,
      ...passwordSH,
    });
    return HttpResponder.CREATED(res, ack.insertedId);
  } catch (error) {
    HttpResponder.NOT_FOUND(res, {
      msg: error.message,
    });
  }
});

async function getInterests(req) {
  try {
    const collInts = req.db.collection("interests");
    //find interest id's by name
    const foundDocs = await collInts
      .find({ interest: { $in: req.body.interests } })
      .map((m) => m._id)
      .toArray();
    return foundDocs;
  } catch (error) {
    throw new Error("Could not find interests.");
  }
}

handler.get(async (req, res) => {
  try {
    const coll = req.db.collection("users");
    const foundDoc = await coll.findOne({ email: req.body.email });
    const calculatedHash = getHash(req.body.password, foundDoc.passwordSalt);
    if (calculatedHash.passwordHash === foundDoc.passwordHash)
      return HttpResponder.OK(res, { msg: "User logged in" });
    else return HttpResponder.UNAUTHORIZED(res, { msg: "Unauthorized" });
  } catch (error) {}
});

handler.put(async (req, res) => {
  try {
    const session = await unstable_getServerSession(req, res, AUTH_OPTIONS);
    if (!session)
      return HttpResponder.UNAUTHORIZED(res, { msg: "Unauthorized" });
    const valid = validateIntPoint(req.body);
    if (!valid)
      return HttpResponder.BAD_REQ(res, {
        msg: validateIntPoint.errors[0].message,
      });
    const coll = req.db.collection("users");

    const currentUser = await coll.findOne({
      _id: new ObjectId(session.user.id),
    });

    const ack = await coll.updateOne(
      { _id: new ObjectId(session.user.id) },
      {
        $set: { [`matches.${currentUser.index}.interest`]: req.body.interest },
      }
    );
    return HttpResponder.OK(res, { msg: "Interest added." });
  } catch (error) {
    return HttpResponder.BAD_REQ(res, { msg: error.message });
  }
});

//To populate db again stay away from
const rand = (max) => Math.floor(Math.random() * max);
const randMin = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

async function populateDB(db) {
  try {
    const response = await fetch("https://randomuser.me/api/?results=500");
    const data = await response.json();

    const coll = db.collection("users");
    const collInts = db.collection("interests");

    const insertData = [];

    for (const result of data.results) {
      const userInts = {};
      const randNumInterests = randMin(2, 5);
      for (let i = 0; i < randNumInterests; ++i) {
        const foundDoc = await collInts.findOne({
          interest: INTERESTS[rand(INTERESTS.length)].toUpperCase(),
        });
        userInts[foundDoc._id] = ObjectId(foundDoc._id);
      }
      insertData.push({
        name: result.name.first,
        interests: Object.values(userInts),
        matches: [],
        profileImg: result.picture.large,
        index: 0,
      });
    }
    return await coll.insertMany(insertData);
  } catch (error) {
    console.error(error);
  }
}

export default handler;
