import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
import { ObjectId } from "mongodb";
import { CASING } from "../../../src/tools/cases";
import { LOGGED_IN_USER } from "../../../src/tools/constants";

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
    const coll = req.db.collection("users");
    const collInts = req.db.collection("interests");

    const foundUser = await coll.findOne({ _id: ObjectId(LOGGED_IN_USER) });

    const pagination = req.query.page - foundUser.index;

    await coll.updateOne(
      { _id: new ObjectId(LOGGED_IN_USER) },
      { $inc: { index: foundUser.index + pagination <= 0 ? 0 : pagination } }
    );

    if (!foundUser) return res.status(404).json({ msg: "User not logged in." });
    const foundDocs = await coll
      .aggregate(NEXT_AGGREGATION(LOGGED_IN_USER))
      .toArray();
    const getUser = await coll
      .aggregate(PROFILE_AGGREGATION(foundDocs[0]._id))
      .toArray();

    const interestIds = getUser[0].interests.map((x) => new ObjectId(x));
    const foundInterests = await collInts
      .find({ _id: { $in: interestIds } })
      .toArray();
    return res.status(200).json({
      name: getUser[0].name,
      img: getUser[0].img,
      interest: foundDocs[0].interest,
      interests: foundInterests.map((m) => CASING.toTitleCase(m.interest)),
    });
  } catch (error) {
    return res.status(404).send(error);
  }
});

handler.put(async (req, res) => {
  try {
    const coll = req.db.collection("users");
    const ack = await coll.updateOne(
      { _id: new ObjectId(LOGGED_IN_USER), index: { $gt: 0 } },
      { $inc: { index: -2 } }
    );
    return res.status(200).send(ack);
  } catch (error) {
    return res.status(404).send(error);
  }
});

export default handler;

function validateBody(body) {
  if (!body.name) return "Enter a proper name";
  if (typeof body.interests === undefined)
    return "Not interests array was passed";
  if (typeof body.profileImg === undefined)
    return "No profile image was passed";
  return null;
}
