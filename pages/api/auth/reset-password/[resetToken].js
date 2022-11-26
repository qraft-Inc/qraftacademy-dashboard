import db from "../../../../data/db";
import User from "../../../../model/User";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export default async function handler(req, res) {
  await db.connect();
  const { resetToken } = req.query;

  if (req.method === "PUT") {

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.user.password, salt);

      // const user = await User.findOne({
      //   resetPasswordToken: resetToken,
      //   resetPasswordExpire: { $gt: Date.now() },
      // });

      const user = await User.findOne({
        "user.user.resetPasswordToken": resetPasswordToken,
        "user.user.resetPasswordExpire": { $gt: Date.now() },
      });
      // console.log("password token ", user.user.resetPasswordToken)

      if (!user) {
        return res
          .status(400)
          .json({ success: false, error: "Sorry, Your Token Expired!" });
      }
      console.log(hashPassword)
      user.user.password = hashPassword;
      user.user.resetPasswordToken = undefined;
      user.user.resetPasswordExpire = undefined;

      await user.save();
      return res.status(201).json({ success: true, message: "Password Reset Success" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
