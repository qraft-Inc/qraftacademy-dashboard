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
      if (user?.admin.isAdmin) token.admin.isAdmin = user.admin.isAdmin;
      if (user?.admin.fullname) token.admin.fullname = user.admin.fullname;
      if (user?.admin.image) token.admin.image = user.admin.image;

      return token;
    },
    async session({ session, token }) {
      if (token?._id) session._id = token.user._id;
      if (token?.admin.isAdmin) session.admin.isAdmin = token.admin.isAdmin;
      if (token?.admin.fullname) session.admin.fullname = token.admin.fullname;
      if (token?.admin.image) token.admin.image = token.admin.image;

      return session;
    },
  },                                                                                                                                                                                                             
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await db.connect();
        // const email = credentials.email;
        // const password = credentials.password;

        const email = credentials.user.email;
        const password = credentials.user.password;
        const user = await User.findOne({ email:admin.email });
        // console.log(user)
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


