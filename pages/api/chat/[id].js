import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
import { HttpResponder } from "../../../src/tools/HttpResponder";
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
    const peerId = await coll.findOne({ _id: new ObjectId(req.query.id) });
    return HttpResponder.OK(res, { id: peerId.peerId });
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
      { $set: { peerId: req.query.id } },
      { upsert: true }
    );

    return HttpResponder.OK(res, { msg: "succeeded" });
  } catch (error) {
    HttpResponder.BAD_REQ(res, { msg: error.message });
  }
});

export default handler;
