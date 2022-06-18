import DB from "./db.js";

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

const SONAR = {
  match,
};
export default SONAR;
