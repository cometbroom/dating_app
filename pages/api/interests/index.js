// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import "dotenv/config";
import nextConnect from "next-connect";
import middleware from "../../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  try {
    const isNotValid = validateBody(req.body);
    if (isNotValid)
      return res
        .status(405)
        .send({ message: `Could not handle request: ${isNotValid}` });
    const interestUp = req.body.interest.toUpperCase();
    const coll = req.body.db.collection("interests");
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
