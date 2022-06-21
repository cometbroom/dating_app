// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { INTERESTS } from "../../../src/backend/Sonar/interests";
import "dotenv/config";
import { CLIENT_DB } from "../../../db/mdb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await CLIENT_DB.connect();
      const isNotValid = validateBody(req.body);
      if (isNotValid) {
        return res.status(404).send({ message: isNotValid });
      }

      const coll = CLIENT_DB.db("Submarine").collection("users");

      const attemptUpsert = await coll.updateOne(
        { _id: ObjectId(req.query.id) },
        {
          $setOnInsert: {
            matches: [
              { id: ObjectId(req.body.id), interest: req.body.interest },
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
            matches: { id: ObjectId(req.body.id), interest: req.body.interest },
          },
        }
      );

      // $set the element where "a": 1 does exist
      const setIfDoesExist = await coll.updateOne(
        { _id: ObjectId(req.query.id), "matches.id": ObjectId(req.body.id) },
        { $set: { "matches.$.interest": req.body.interest } }
      );

      res.status(200).send({ attemptUpsert, pushIfNotExist, setIfDoesExist });
      return;
    } catch (error) {
      console.error(error);
    } finally {
      return CLIENT_DB.close();
    }
  }
}

function validateBody(body) {
  if (!body.id) return "Enter a proper id";
  if (!body.interest) return "No interest number was passed";
  return null;
}
