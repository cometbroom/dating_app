// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import "dotenv/config";
import { ObjectId } from "mongodb";
import nextConnect from "next-connect";
import middleware from "../../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

//Set interest on a match
handler.post(async (req, res) => {
  try {
    const isNotValid = validateBody(req.body);
    if (isNotValid) {
      return res.status(404).send({ message: isNotValid });
    }

    const coll = req.db.collection("users");

    const attemptUpsert = await coll.updateOne(
      { _id: ObjectId(req.query.id) },
      {
        $setOnInsert: {
          matches: [
            { _id: ObjectId(req.body.id), interest: req.body.interest },
          ],
        },
      },
      { upsert: true }
    );

    // $push the element where "a": 1 does not exist
    const pushIfNotExist = await coll.updateOne(
      {
        _id: ObjectId(req.query.id),
        "matches.id": { $ne: ObjectId(req.body.id) },
      },
      {
        $push: {
          matches: { _id: ObjectId(req.body.id), interest: req.body.interest },
        },
      }
    );

    // $set the element where "a": 1 does exist
    const setIfDoesExist = await coll.updateOne(
      { _id: ObjectId(req.query.id), "matches._id": ObjectId(req.body.id) },
      { $set: { "matches.$.interest": req.body.interest } }
    );

    res.status(200).send({ attemptUpsert, pushIfNotExist, setIfDoesExist });
    return;
  } catch (error) {
    console.error(error);
  }
});

function validateBody(body) {
  if (!body.id) return "Enter a proper id";
  if (!body.interest) return "No interest number was passed";
  return null;
}
export default handler;
