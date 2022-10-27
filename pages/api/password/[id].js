import db from "../../../data/db";
import User from "../../../model/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
 
  const { id } = req.query;

  await db.connect();

  if (req.method === "PUT") {
    try {
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(req.body.password, salt);

      const password = await User.findByIdAndUpdate(
        { _id: id },
        { password: newPassword },
        { new: true }
      );
      await db.disconnect();
      return res.status(200).json(password);
    } catch (err) {
      res.status(500).json(err);
    }
  }

}
