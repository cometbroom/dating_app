// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import "dotenv/config";
import { ObjectId } from "mongodb";

import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
import { validate } from "../../../src/backend/validation/userSchema";
import saltHashPassword, {
  getHash,
} from "../../../src/backend/authentication/crypto";
import { HttpResponder } from "../../../src/tools/HttpResponder";
import { unstable_getServerSession } from "next-auth/next";
import { AUTH_OPTIONS } from "../auth/[...nextauth]";
import { validateIntPoint } from "../../../src/backend/validation/pointSchema";

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

    const interests = await getInterests(
      req.db.collection("interests"),
      req.body.interests
    );

    const passwordSH = saltHashPassword(req.body.password);
    //Insert user with interests and matches
    const ack = await usersColl.insertOne({
      name: req.body.name,
      email: req.body.email,
      interests,
      matches: [],
      profileImg: req.body.img || "",
      index: 0,
      peerId: "",
      ...passwordSH,
    });

    return HttpResponder.CREATED(res, ack.insertedId);
  } catch (error) {
    HttpResponder.NOT_FOUND(res, {
      msg: error.message,
      ...error,
    });
  }
});

async function getInterests(collection, interests) {
  try {
    //find interest id's by name
    const foundDocs = await collection
      .find({ interest: { $in: interests } })
      .map((m) => m._id)
      .toArray();
    return foundDocs;
  } catch (error) {
    throw new Error("Could not find interests.");
  }
}

export default handler;
