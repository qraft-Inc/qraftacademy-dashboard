import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "../../../data/db";
import User from "../../../model/User";
import bcrypt from "bcryptjs";

const authOptions = {
  session: {
    strategy: "jwt",
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

        const user = await User.findOne({ email: user.admin.email });
        if (!user) {
          throw new Error("User does not exist");
        }
        if (email !== "admin@gmail.com" || password !== "1") {
          throw new Error("invalid credentials");
        }
        return { name: "admin", email: "admin@gmail.com" };
      },
    }),
  ],
};
export default NextAuth(authOptions);
