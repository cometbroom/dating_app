import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
import { ObjectId } from "mongodb";
import { CASING } from "../../../src/tools/cases";

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

const loggedInUserID = "62b17e42e8d61e12618a5626";

handler.get(async (req, res) => {
  // if (isNotValid)
  //   return res
  //     .status(405)
  //     .send({ message: `Could not handle request: ${isNotValid}` });
  try {
    const coll = req.db.collection("users");
    const collInts = req.db.collection("interests");
    const foundDocs = await coll
      .aggregate(NEXT_AGGREGATION(loggedInUserID))
      .toArray();
    if (!foundDocs) return res.status(404).json({ msg: "User not logged in." });
    await coll.updateOne(
      { _id: new ObjectId(loggedInUserID) },
      { $inc: { index: 1 } }
    );

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
      { _id: new ObjectId(loggedInUserID), index: { $gt: 0 } },
      { $inc: { index: -1 } }
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
