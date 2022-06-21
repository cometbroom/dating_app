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

function match(interests, amountOfResults = 20) {
  const users = DB.readList();
  const filteredUsers = [];

  for (let i = 0; i < users.length; ++i) {
    const affinityMatch = affinityCounter(interests, users[i].interests);
    if (affinityMatch > 0)
      filteredUsers.push({ ...users[i], affinity: affinityMatch });
  }
  const sortedUsers = filteredUsers.sort((a, b) => b.affinity - a.affinity);
  return sortedUsers.splice(0, amountOfResults);
}

function affinityCounter(array1, array2) {
  let affinity = 0;

  for (let i = 0; i < array1.length; ++i) {
    if (array2.includes(array1[i])) affinity++;
  }
  return affinity;
}

async function matches(client, interests) {
  try {
    const coll = client.db("Submarine").collection("users");
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
