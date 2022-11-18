import db from "../../../../data/db";
import User from "../../../../model/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  await db.connect();
  if (req.method === "POST") {
    const { tokenid } = req.query;

    try {
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(req.body.password, salt);

      const user = await User.findOne({
        resetPasswordToken: tokenid,
        resetPasswordExpire: { $gt: Date.now() },
      });

      if (!user) {
        return res
          .status(400)
          .json({ success: false, error: "Sorry, Your Token Expired!" });
      }
      user.password = newPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();
      res.status(201).json({ success: true, message: "Password Reset Success" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
