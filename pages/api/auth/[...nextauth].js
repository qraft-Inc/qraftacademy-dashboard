import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import db from "../../../data/db";
import User from "../../../model/User";
import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const { email, password } = credentials;

        const user = await User.findOne({ user: email });

        if (!user) {
          throw new Error("User does not exist");
        }
        if (user && bcrypt.compareSync(password, user.admin.password)) {
          return {
            _id: user._id,
            email: user.admin.email,
            fullname: user.admin.fullname,
            isAdmin: user.admin.isAdmin,
            image: user.admin.image,
          };
        }
        throw new Error("Invalid credentials");
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user?._id) token.id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      if (user?.fullname) token.fullname = user.fullname;
      if (user?.image) token.image = user.image;
      return token;
    },
    async session({ session, user, token }) {
      if (token?.id) session.user.id = token.id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      if (token?.fullname) session.user.fullname = token.fullname;
      if (token?.image) session.user.image = token.image;

      return session;
    },
  },
});
