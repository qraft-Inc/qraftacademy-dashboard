import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import db from "../../../data/db";
import User from "../../../model/User";
import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      // credentials: {
      //   username: { label: "Username", type: "text", placeholder: "jsmith" },
      //   password: { label: "Password", type: "password" }
      // },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
        const { email, password } = credentials;

        console.log({ email, password });

        const user = await User.findOne({ user: email });
        console.log(user);
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
});
