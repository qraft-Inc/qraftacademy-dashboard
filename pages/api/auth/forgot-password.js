import db from "../../../data/db";
import User from "../../../model/User";
import nodemailer from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid-transport";
import crypto from "crypto";

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.NODEMAILER_API_KEY,
    },
  })
);

export default async function handler(req, res) {
  await db.connect();
  if (req.method === "POST") {
    try {
      const { email } = req.body.user;

      const user = await User.findOne({ "user.email": email });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "Email Could Not Be Sent" });
      }
      const resetToken = user.getResetPasswordToken();

      await user.save();

      const resetUrl = `${process.env.RESET_URL}/reset-password/${resetToken}`;

      const message = `<h1>You requested a password reset</h1>
                  <p>click this link to reset password</p>
                      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>`;


      try {
        await transporter.sendMail({
          to: user.user.email,
          from: process.env.EMAIL_FROM,
          subject: "Password Reset Request",
          html: message,
        });
        res.status(200).json({ success: true, message: "Check You Email" });

      } catch (error) {
        user.user.resetPasswordToken = undefined;
        user.user.resetPasswordExpire = undefined;

        await user.save();

        return res
          .status(500)
          .json({ success: false, message: "Email could not be sent" });
      }

      console.log(user)
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
