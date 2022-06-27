import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
import { HttpResponder } from "../../../src/tools/HttpResponder";
import { ObjectId } from "mongodb";
import { unstable_getServerSession } from "next-auth/next";
import { AUTH_OPTIONS } from "../auth/[...nextauth]";
const handler = nextConnect();

const GET_CHATS_AGG = (array) => [
  {
    $match: {
      _id: {
        $in: array.map((x) => new ObjectId(x.id)),
      },
    },
  },
  {
    $project: {
      _id: 0,
      name: "$name",
      img: "$profileImg",
      peer: "$peerId",
    },
  },
];

handler.use(middleware);

handler.get(async (req, res) => {
  try {
    const session = await unstable_getServerSession(req, res, AUTH_OPTIONS);
    if (!session)
      return HttpResponder.UNAUTHORIZED(res, { msg: "Unauthorized" });
    const coll = req.db.collection("users");
    const peerId = await coll
      .aggregate(GET_CHATS_AGG(session.user.chats))
      .toArray();
    console.log("fetched", peerId);

    return HttpResponder.OK(res, peerId);
  } catch (error) {
    HttpResponder.BAD_REQ(res, { msg: error.message });
  }
});

export default handler;
