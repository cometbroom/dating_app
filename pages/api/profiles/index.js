import { ObjectId } from "mongodb";
import { unstable_getServerSession } from "next-auth";
import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
import { LOGGED_IN_USER } from "../../../src/tools/constants";
import { AUTH_OPTIONS } from "../auth/[...nextauth]";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const session = await unstable_getServerSession(req, res, AUTH_OPTIONS);
  if (!session) return res.status(401).json({ msg: "User not logged in" });
  try {
    const coll = req.db.collection("users");
    const foundDoc = await coll.findOne({ _id: new ObjectId(session.user.id) });
    if (!foundDoc) return res.status(404).json({ msg: "user not found" });
    return res.status(200).json({ index: foundDoc.index });
  } catch (error) {}
});

export default handler;
