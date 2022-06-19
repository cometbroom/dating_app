import { writeFileSync, readFileSync } from "fs";

const USERSPATH = new URL("./profiles.json", import.meta.url);

function writeList(list) {
  const jsonString = JSON.stringify(list, null, 2);
  writeFileSync(USERSPATH, jsonString);
}

function readList() {
  const data = readFileSync(USERSPATH);
  return JSON.parse(data);
}
const DB = { writeList, readList };
export default DB;
