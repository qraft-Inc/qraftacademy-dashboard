import db from "../../../../data/db";
import User from "../../../../model/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  await db.connect();
  const { tokenid } = req.query;
  console.log(tokenid);
  if (req.method === "POST") {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.user.password, salt);

      const user = await User.findOne({
        resetPasswordToken: tokenid,
        resetPasswordExpire: { $gt: Date.now() },
      });
      console.log(user);

      if (!user) {
        return res
          .status(400)
          .json({ success: false, error: "Sorry, Your Token Expired!" });
      }
      user.password = hashPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();
      res
        .status(201)
        .json({ success: true, message: "Password Reset Success" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
