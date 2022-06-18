import fetch from "node-fetch";
import { INTERESTS } from "./interests.js";
import DB from "./db.js";
import SONAR from "./getMatch.js";

const rand = (max) => Math.floor(Math.random() * max);
const randMin = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

async function populateDB() {
  try {
    const response = await fetch("https://randomuser.me/api/?results=500");
    const data = await response.json();
    const users = [];
    data.results.forEach((result) => {
      const userInts = [];
      const randNumInterests = randMin(2, 5);
      for (let i = 0; i < randNumInterests; ++i) {
        // const rand_o = new Random(0, randNumInterests);
        userInts.push(INTERESTS[rand(INTERESTS.length)]);
      }
      users.push({
        name: result.name.first,
        interests: [...new Set(userInts)],
      });
    });
    DB.writeList(users);
  } catch (error) {
    console.error(error);
  }
}

SONAR.match([INTERESTS[0], INTERESTS[5], INTERESTS[1], INTERESTS[4]]);
