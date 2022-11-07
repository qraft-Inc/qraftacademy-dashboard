import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "../../../data/db";
import User from "../../../model/User";
import bcrypt from "bcryptjs";

const authOptions = {
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
      // if (token?._id) session._id = token.user._id;
      if (token?.isAdmin) session.isAdmin = token.isAdmin;
      if (token?.fullname) session.fullname = token.fullname;
      if (token?.image) token.image = token.image;

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      type: "credentials",

      async authorize(credentials) {
        const email = credentials.email;
        const password = credentials.password;

        // if (email !== "admin@gmail.com" || password !== "1") {
        //   throw new Error("invalid credentials");
        // }
        // return {name: "admin", email: "admin@gmail.com" };

        const user = await User.findOne({ user: email });
        if (!user) {
          throw new Error("User does not exist");
        }

        console.log(user.admin.fullname);
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
  secret: process.env.JWT_SECRET,
};
export default NextAuth(authOptions);
