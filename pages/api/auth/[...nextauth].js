import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "../../../data/db";
import User from "../../../model/User";
import bcrypt from "bcryptjs";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      if (user?.fullname) token.fullname = user.fullname;
      if (user?.image) token.image = user.image;

      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      if (token?.fullname) session.user.fullname = token.fullname;
      if (token?.image) token.image = token.image;

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await db.connect();
        const email = credentials.email;
        const password = credentials.password;
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User does not exist");
        }
        if (user && bcrypt.compareSync(password, user.password)) {
          return {
            _id: user._id,
            email: user.email,
            fullname: user.fullname,
            isAdmin: user.isAdmin,
            image: user.image,
          };
        }
        throw new Error("Invalid credentials");
      },
    }),
  ],
  secret: "secret",
});


