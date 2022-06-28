import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
import { unstable_getServerSession } from "next-auth/next";
import { AUTH_OPTIONS } from "../auth/[...nextauth]";
import { validateIntPoint } from "../../../src/backend/validation/pointSchema";
import { ObjectId } from "mongodb";
import { HttpResponder } from "../../../src/tools/HttpResponder";

const handler = nextConnect();

handler.use(middleware);

handler.put(async (req, res) => {
  try {
    const session = await unstable_getServerSession(req, res, AUTH_OPTIONS);
    if (!session)
      return HttpResponder.UNAUTHORIZED(res, { msg: "Unauthorized" });
    const valid = validateIntPoint(req.body);
    if (!valid)
      return HttpResponder.BAD_REQ(res, {
        msg: validateIntPoint.errors[0].message,
      });
    const coll = req.db.collection("users");

    const currentUser = await coll.findOne({
      _id: new ObjectId(session.user.id),
    });

    if (!currentUser)
      return HttpResponder.NOT_FOUND(res, { msg: "Please login." });

    updateInterestOutgoing(coll, currentUser, req.query.id, req.body.interest);

    return HttpResponder.OK(res, { msg: "Interest added." });
  } catch (error) {
    return HttpResponder.BAD_REQ(res, { msg: error.message });
  }
});

async function updateInterestOutgoing(
  collection,
  currentUser,
  targetId,
  interest
) {
  await collection.updateOne(
    {
      _id: new ObjectId(currentUser._id),
      matches: {
        $not: {
          $elemMatch: {
            _id: ObjectId(targetId),
          },
        },
      },
    },
    {
      $addToSet: {
        matches: {
          _id: new ObjectId(targetId),
          interest: interest,
        },
      },
    }
  );
  await collection.updateOne(
    {
      _id: new ObjectId(currentUser._id),
      "matches._id": new ObjectId(targetId),
    },
    {
      $set: { [`matches.$.interest`]: interest },
    }
  );
}

export default handler;
