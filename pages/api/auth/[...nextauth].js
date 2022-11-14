import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import User from "../../../model/User";
import bcrypt from "bcryptjs";
import db from "../../../data/db";

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        await db.connect();
        const { email, password } = credentials;

        const user = await User.findOne({ "user.email": email });
        await db.disconnect();
        if (!user) {
          throw new Error("User does not exist");
        }

        if (user && bcrypt.compareSync(password, user.user.password)) {
          return user;
        }
        throw new Error("Invalid credentials");
      },
    }),
  ],
  session: {
    strategy: jwt,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.user.isAdmin) token.isAdmin = user.user.isAdmin;
      if (user?.user.fullname) token.fullname = user.user.fullname;
      if (user?.user.image) token.image = user.user.image;
      return token;
    },
    async session({ session, user, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      if (token?.fullname) session.user.fullname = token.fullname;
      if (token?.image) session.user.image = token.image;

      return session;
    },
  },
  secret: process.env.JWT_SECRET,
});
