const matchesAggregation = (interests) => [
  {
    $set: {
      matchedCount: {
        $size: {
          $setIntersection: ["$interests", interests],
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
