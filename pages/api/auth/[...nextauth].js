import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import User from "../../../model/User";
import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        // const { email, password } = credentials;

        const email = credentials.email;
        const password = credentials.password;

        // const user = await User.findOne({ email });
        const user = await User.findOne({ "user.email": credentials.email });

        if (!user) {
          throw new Error("User does not exist");
        }

        if (user && bcrypt.compareSync(password, user.user.password)) {
          // return {
          //   _id: user._id,
          //   email: user.user.email,
          //   fullname: user.user.fullname,
          //   isAdmin: user.user.isAdmin,
          //   image: user.user.image,
          // };
          return user;
        }
        throw new Error("Invalid credentials");
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
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
});
