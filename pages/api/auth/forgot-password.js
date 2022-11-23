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
  // const { method } = req;
  await db.connect();
  if (req.method === "POST") {
    try {
      crypto.randomBytes(32, async (err, buffer) => {
        if (err) {
          console.log(err);
        }
        const tokenid = buffer.toString("hex");

        const { email } = req.body.user;
        // console.log("EMAIL :", email)
        const user = await User.findOne({ "user.email": email });
        // console.log(user)
        if (!user) {
          return res
            .status(404)
            .json({ success: false, error: "Email Could Not Be Sent" });
        }
        user.resetPasswordToken = tokenid;
        user.resetPasswordExpire = Date.now() + 3600000;

        const resetUrl = `${process.env.RESET_URL}/reset-password/${tokenid}`;
        const message = `<h1>You requested a password reset</h1>
                    <p>click this link to reset password</p>
                        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>`;

        await user.save();
        await transporter.sendMail({
          to: user.user.email,
        
          from: process.env.EMAIL_FROM,
          subject: "Password Reset Request",
          html: message,
        });
        res.status(200).json({ success: true, message: "Check You Email" });
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
