import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
import { PEER_IDS } from "../../../src/tools/constants";
import { HttpResponder } from "../../../src/tools/HttpResponder";
import { v4 as uuidv4 } from "uuid";
import { ObjectId } from "mongodb";
import { unstable_getServerSession } from "next-auth/next";
import { AUTH_OPTIONS } from "../auth/[...nextauth]";
const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  try {
    const session = await unstable_getServerSession(req, res, AUTH_OPTIONS);
    if (!session)
      return HttpResponder.UNAUTHORIZED(res, { msg: "Unauthorized" });
    const coll = req.db.collection("users");
    console.log(session.user.id);
    const foundUser = await coll.findOne({
      _id: new ObjectId(session.user.id),
    });
    if (!foundUser)
      return HttpResponder.NOT_FOUND(res, { msg: "User not found" });
    const peerId = await coll.findOne({ _id: foundUser.chats[0] });
    return HttpResponder.OK(res, peerId.peerId);
  } catch (error) {
    HttpResponder.BAD_REQ(res, { msg: error.message });
  }
});

handler.post(async (req, res) => {
  try {
    const session = await unstable_getServerSession(req, res, AUTH_OPTIONS);
    if (!session)
      return HttpResponder.UNAUTHORIZED(res, { msg: "Unauthorized" });
    const coll = req.db.collection("users");
    const ack = await coll.findOneAndUpdate(
      { _id: new ObjectId(session.user.id) },
      { $set: { peerId: req.body.id } },
      { upsert: true }
    );

    return HttpResponder.OK(res, { msg: "succeeded" });
  } catch (error) {
    HttpResponder.BAD_REQ(res, { msg: error.message });
  }
});

export default handler;
