// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import "dotenv/config";
import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
import { CASING } from "../../../src/tools/cases";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  try {
    const coll = req.db.collection("interests");
    const foundDocs = await coll.find().toArray();
    return res
      .status(200)
      .json(foundDocs.map((x) => CASING.toTitleCase(x.interest)));
  } catch (error) {
    res.status(404).json({ msg: "Interests not found" });
  }
});

handler.post(async (req, res) => {
  try {
    const isNotValid = validateBody(req.body);
    if (isNotValid)
      return res
        .status(405)
        .send({ message: `Could not handle request: ${isNotValid}` });
    const interestUp = req.body.interest.toUpperCase();
    const coll = req.db.collection("interests");
    const ack = await coll.updateOne(
      { interest: interestUp },
      { $setOnInsert: { interest: interestUp } },
      { upsert: true }
    );
    return res.status(200).send(ack);
  } catch (error) {
    return res.status(404).send(error);
  }
});

function validateBody(body) {
  if (!body.interest) return "No interest array was passed";
  return null;
}

export default handler;
