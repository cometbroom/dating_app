import { MongoClient } from "mongodb";
import "dotenv/config";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

export const CLIENT_DB = new MongoClient(process.env.MONGODB_URI);
