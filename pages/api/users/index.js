// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { INTERESTS } from "../../../src/backend/Sonar/interests";
import "dotenv/config";
import { ObjectId } from "mongodb";
import SONAR from "../../../src/backend/SONAR";

import nextConnect from "next-connect";
import middleware from "../../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

//Matches have to be calculated here.
//find one limit 1 or skip 1 to get to your page.
handler.post(async (req, res) => {
  try {
    // await CLIENT_DB.connect();
    // const result = await populateDB(req.db);
    // return res.status(200).send(result);
    const isNotValid = validateBody(req.body);
    if (isNotValid)
      return res
        .status(405)
        .send({ message: `Could not handle request: ${isNotValid}` });
    const collInts = req.db.collection("interests");
    //Upper case insensitivity
    const interests = req.body.interests.map((x) => x.toUpperCase());

    //find interest id's by name
    const foundDocs = await collInts
      .find({ interest: { $in: interests } })
      .map((m) => m._id)
      .toArray();

    //Find matches according to interest
    const matches = await SONAR.matches(req.db, foundDocs);

    //Insert user with interests and matches
    const ack = await req.db.collection("users").insertOne({
      name: req.body.name,
      interests: foundDocs,
      matches: matches.map((match) => ({ _id: match._id, interest: 0 })),
      profileImg: req.body.img,
      index: 0,
    });
    res.status(200).send(ack.insertedId);
    return;
  } catch (error) {
    console.error(error);
  }
});

function validateBody(body) {
  if (!body.name) return "Enter a proper name";
  if (typeof body.interests === undefined)
    return "Not interests array was passed";
  if (typeof body.profileImg === undefined)
    return "No profile image was passed";
  return null;
}

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
