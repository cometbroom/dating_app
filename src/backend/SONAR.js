import { ObjectId } from "mongodb";

const b = [
  {
    $set: {
      matchedCount: {
        $size: {
          $setIntersection: [
            "$interests",
            [
              new ObjectId("62b0d473a4ca317b9b2c20ea"),
              new ObjectId("62b0d473a4ca317b9b2c20bd"),
            ],
          ],
        },
      },
    },
  },
  {
    $sort: {
      index: -1,
    },
  },
];

const matchesAggregation = (interests) => [
  //          $setIntersection: ["$interests", interests],
  {
    $set: {
      matchedCount: {
        $size: {
          $setIntersection: [["$interests", ...interests]],
        },
      },
    },
  },
  {
    $sort: {
      matchedCount: -1,
    },
  },
  {
    $project: {
      _id: "$_id",
      matchCount: "$matchedCount",
    },
  },
];

async function matches(db, interests) {
  try {
    const coll = db.collection("users");
    const foundDocs = await coll
      .aggregate(matchesAggregation(interests))
      .toArray();
    return foundDocs;
  } catch (error) {
    throw error;
  }
}

const SONAR = {
  matches,
};
export default SONAR;
