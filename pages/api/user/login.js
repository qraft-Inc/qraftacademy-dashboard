import db from "../../../data/db";
import User from "../../../model/User";
import bcrypt from "bcryptjs";
import { signToken } from "../auth/nextauth";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await db.connect();
    const user = await User.findOne({ email: req.body.email });
    await db.disconnect();

    if (user && bcrypt.compareSync(req.body.password, user.admin.password)) {
      const token = signToken(user);
      res.send({
        token,
        _id: user._id,
        email: user.admin.email,
        fullname: user.admin.fullname,
        isAdmin: user.admin.isAdmin,
        image: user.admin.image,
      });
    } else {
      res.status(401).send({ message: "Invalid credentials" });
    }
  }
}
