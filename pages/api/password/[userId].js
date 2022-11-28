import db from "../../../data/db";
import User from "../../../model/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  const { userId } = req.query;

  await db.connect();

  if (req.method === "PUT") {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.user.password, salt);

      //update user password
      const user = await User.findByIdAndUpdate(
        userId,
        {
          "user.password": hashPassword,
        },
        { new: true }
      );

      await db.disconnect();
      return res.status(200).json({ success: true, user });
    } catch (err) {
      res
        .status(500)
        .json(
          err.response && err.response.data && err.reponse.data.message
            ? err.reponse.data.message
            : err.message
        );
    }
  }
}
