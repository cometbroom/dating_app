import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
import { ObjectId } from "mongodb";
import { HttpResponder } from "../../../src/tools/HttpResponder";
import { unstable_getServerSession } from "next-auth/next";
import { AUTH_OPTIONS } from "../auth/[...nextauth]";

const MATCH_INTEREST_AGGREGATION = (currentId, matchId) => [
  {
    $match: {
      _id: new ObjectId(currentId),
    },
  },
  {
    $project: {
      _id: 0,
      matches: "$matches",
    },
  },
  {
    $unwind: {
      path: "$matches",
    },
  },
  {
    $match: {
      "matches._id": matchId,
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
      name: "$name",
      interests: "$interests",
      img: "$profileImg",
    },
  },
];

const MATCH_AGGREGATION = (interests, next) => [
  {
    $project: {
      matchedCount: {
        $size: {
          $ifNull: [
            {
              $setIntersection: ["$interests", interests],
            },
            [],
          ],
        },
      },
    },
  },
  {
    $sort: {
      matchedCount: -1,
      _id: -1,
    },
  },
  {
    $project: {
      _id: "$_id",
      matchCount: "$matchedCount",
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
    const finalIndex = foundUser.index + pagination <= 0 ? 0 : pagination;

    await coll.updateOne(
      { _id: new ObjectId(session.user.id) },
      { $inc: { index: finalIndex } }
    );

    const nextMatch = await coll
      .aggregate(MATCH_AGGREGATION(foundUser.interests))
      .skip(foundUser.index + finalIndex)
      .limit(1)
      .toArray();

    const nextMatchDocument = await coll
      .aggregate(PROFILE_AGGREGATION(nextMatch[0]._id))
      .toArray();

    const interestTowardsNextMatch = await coll
      .aggregate(
        MATCH_INTEREST_AGGREGATION(session.user.id, nextMatchDocument[0]._id)
      )
      .toArray();

    console.log(interestTowardsNextMatch);

    const nextMatchInterests = await collInts
      .find({ _id: { $in: nextMatchDocument[0].interests } })
      .toArray();

    return HttpResponder.OK(res, {
      id: nextMatchDocument[0]._id,
      name: nextMatchDocument[0].name,
      img: nextMatchDocument[0].img,
      interest:
        interestTowardsNextMatch.length > 0
          ? interestTowardsNextMatch[0].matches.interest
          : 0,
      interests: nextMatchInterests.map((m) => m.interest),
    });
  } catch (error) {
    console.log(error.message);
    return HttpResponder.NOT_FOUND(error.message);
  }
});

export default handler;
