// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { INTERESTS } from "../../../src/backend/Sonar/interests";
import "dotenv/config";
import { CLIENT_DB } from "../../../db/mdb";
import { ObjectId } from "mongodb";
import SONAR from "../../../src/backend/SONAR";

//Matches have to be calculated here.
//find one limit 1 or skip 1 to get to your page.
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // await CLIENT_DB.connect();
      // const result = await populateDB(CLIENT_DB);
      // return res.status(200).send(result);
      const isNotValid = validateBody(req.body);
      if (isNotValid)
        return res
          .status(405)
          .send({ message: `Could not handle request: ${isNotValid}` });
      const collInts = CLIENT_DB.db("Submarine").collection("interests");
      const interests = req.body.interests.map((x) => x.toUpperCase());
      const foundDocs = await collInts
        .find({ interest: { $in: interests } })
        .map((m) => m._id)
        .toArray();
      const matches = await SONAR
      const ack = await CLIENT_DB.db("Submarine")
        .collection("users")
        .insertOne({
          name: req.body.name,
          interests: foundDocs,
          matches: [],
          profileImg: req.body.img,
          index: 0,
        });
      res.status(200).send(ack.insertedId);
      return;
    } catch (error) {
      console.error(error);
    } finally {
      return CLIENT_DB.close();
    }
  }
}

function validateBody(body) {
  if (!body.name) return "Enter a proper name";
  if (typeof body.interests === undefined)
    return "Not interests array was passed";
  if (typeof body.profileImg === undefined)
    return "No profile image was passed";
  return null;
}

//To populate db again stay away from
const rand = (max) => Math.floor(Math.random() * max);
const randMin = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

async function populateDB() {
  try {
    const response = await fetch("https://randomuser.me/api/?results=500");
    const data = await response.json();

    const coll = CLIENT_DB.db("Submarine").collection("users");
    const collInts = CLIENT_DB.db("Submarine").collection("interests");

    const insertData = [];

    for (const result of data.results) {
      const userInts = {};
      const randNumInterests = randMin(2, 5);
      for (let i = 0; i < randNumInterests; ++i) {
        const foundDoc = await collInts.findOne({
          interest: INTERESTS[rand(INTERESTS.length)].toUpperCase(),
        });
        userInts[foundDoc._id] = ObjectId(foundDoc._id);
      }
      insertData.push({
        name: result.name.first,
        interests: Object.values(userInts),
        matches: [],
        profileImg: result.picture.large,
        index: 0,
      });
    }
    return await coll.insertMany(insertData);
  } catch (error) {
    console.error(error);
    CLIENT_DB.close();
  } finally {
    return CLIENT_DB.close();
  }
}
