import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db_client } from "../../../middleware/database";
import { getHash } from "../../../src/backend/authentication/crypto";

export const AUTH_OPTIONS = {
  session: {
    jwt: true,
  },
  //Specify Provider
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        db_client.connect();
        const coll = db_client.db("Submarine").collection("users");
        //Find user with the email
        const result = await coll.findOne({
          email: credentials.email,
        });
        if (!result) throw new Error("No user found with the email");
        const calculatedHash = getHash(req.body.password, result.passwordSalt);
        if (calculatedHash.passwordHash !== result.passwordHash)
          throw new Error("Password doesnt match");

        return {
          id: result._id,
          peerId: result.peerId,
          chats: result.chats,
          name: result.name,
          email: result.email,
          image: result.profileImg,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      user &&
        ((token.userId = user.id),
        (token.peerId = user.peerId),
        (token.chats = user.chats));
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.userId;
      session.user.peerId = token.peerId;
      session.user.chats = token.chats;
      return session;
    },
  },
};

export default NextAuth(AUTH_OPTIONS);
