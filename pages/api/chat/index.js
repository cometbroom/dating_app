import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
import { PEER_IDS } from "../../../src/tools/constants";
import { HttpResponder } from "../../../src/tools/HttpResponder";
import { v4 as uuidv4 } from "uuid";

const handler = nextConnect();

handler.use(middleware);

const availableIds = [PEER_IDS.id1, PEER_IDS.id2];
let index = 0;

handler.get(async (req, res) => {
  const fakeId = req.query.fakeId;
  if (fakeId < 0 || fakeId >= availableIds.length)
    return HttpResponder.BAD_REQ(res, { msg: "no id could be found" });

  return HttpResponder.OK(res, { id: uuidv4() });
});

export default handler;
