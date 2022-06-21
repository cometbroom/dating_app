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
      if (isNotValid)
        return res
          .status(405)
          .send({ message: `Could not handle request: ${isNotValid}` });
      const interestUp = req.body.interest.toUpperCase();
      const coll = CLIENT_DB.db("Submarine").collection("interests");
      const ack = await coll.updateOne(
        { interest: interestUp },
        { $setOnInsert: { interest: interestUp } },
        { upsert: true }
      );

      res.status(200).send(ack);
      return;
    } catch (error) {
      console.error(error);
    } finally {
      return CLIENT_DB.close();
    }
  }
}

function validateBody(body) {
  if (!body.interest) return "No interest array was passed";
  return null;
}
