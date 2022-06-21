import { ObjectId } from "mongodb";
import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
import { LOGGED_IN_USER } from "../../../src/tools/constants";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  try {
    const coll = req.db.collection("users");
    const foundDoc = await coll.findOne({ _id: new ObjectId(LOGGED_IN_USER) });
    if (!foundDoc) return res.status(404).json({ msg: "user not found" });
    return res.status(200).json({ index: foundDoc.index });
  } catch (error) {}
});

export default handler;
