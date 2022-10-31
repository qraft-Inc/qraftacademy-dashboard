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
      if (user?.user._id) token._id = user._id;
      if (user?.user.isAdmin) token.isAdmin = user.isAdmin;
      if (user?.user.fullname) token.fullname = user.fullname;
      if (user?.user.image) token.image = user.image;

      return token;
    },
    async session({ session, token }) {
      if (token?.user_id) session.user._id = token.user._id;
      if (token?.user.isAdmin) session.user.isAdmin = token.user.isAdmin;
      if (token?.user.fullname) session.user.fullname = token.user.fullname;
      if (token?.user.image) token.image = token.user.image;

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


