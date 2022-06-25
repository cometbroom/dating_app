import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
import { ObjectId } from "mongodb";
import { HttpResponder } from "../../../src/tools/HttpResponder";
import { unstable_getServerSession } from "next-auth/next";
import { AUTH_OPTIONS } from "../auth/[...nextauth]";

const NEXT_AGGREGATION = (id) => [
  {
    $match: {
      _id: new ObjectId(id),
    },
  },
  {
    $addFields: {
      firstEl: {
        $arrayElemAt: ["$matches", "$index"],
      },
    },
  },
  {
    $project: {
      _id: "$firstEl._id",
      interest: "$firstEl.interest",
    },
  },
];

const PROFILE_AGGREGATION = (id) => [
  {
    $match: {
      _id: id,
    },
  },
  {
    $project: {
      _id: 0,
      name: "$name",
      interests: "$interests",
      img: "$profileImg",
    },
  },
];

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  try {
    const session = await unstable_getServerSession(req, res, AUTH_OPTIONS);
    if (!session)
      return HttpResponder.UNAUTHORIZED(res, { msg: "Unauthorized" });
    const coll = req.db.collection("users");
    const collInts = req.db.collection("interests");

    const foundUser = await coll.findOne({
      _id: ObjectId(session.user.id),
    });

    const pagination = req.query.page - foundUser.index;

    await coll.updateOne(
      { _id: new ObjectId(session.user.id) },
      { $inc: { index: foundUser.index + pagination <= 0 ? 0 : pagination } }
    );

    const foundDocs = await coll
      .aggregate(NEXT_AGGREGATION(session.user.id))
      .toArray();
    const getUser = await coll
      .aggregate(PROFILE_AGGREGATION(foundDocs[0]._id))
      .toArray();

    const interestIds = getUser[0].interests.map((x) => new ObjectId(x));
    const foundInterests = await collInts
      .find({ _id: { $in: interestIds } })
      .toArray();

    return HttpResponder.OK(res, {
      name: getUser[0].name,
      img: getUser[0].img,
      interest: foundDocs[0].interest,
      interests: foundInterests.map((m) => m.interest),
    });
  } catch (error) {
    console.log(error.message);
    return HttpResponder.NOT_FOUND(error.message);
  }
});

export default handler;
