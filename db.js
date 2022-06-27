import Dexie from "dexie";

export const db = new Dexie("messageHistory");

db.version(1).stores({
  messages: "++id, sender, text, sent",
});
