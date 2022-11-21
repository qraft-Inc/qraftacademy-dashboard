import db from "../../../data/db";
import User from "../../../model/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  const { userId } = req.query;

  await db.connect();

  if (req.method === "PUT") {
    console.log("password: ", req.body.user.password);
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.user.password, salt);

      console.log("Hashed password: ", hashPassword);
      const password = await User.findByIdAndUpdate(
        userId,
        {
          // "user.email": req.body.user.email,
          // "user.fullname": req.body.user.fullname,
          // "user.image": req.body.user.image,
          "user.password": hashPassword,
        },
        { new: true }
      );

      // User.findByIdAndUpdate(req.user.id, req.body, function (err, user) {
      //   if (err) {
      //     return next(err);
      //   } else {
      //     user.password = req.body.new_password;
      //     user.save(function (err, user) {
      //       if (err) {
      //         res.send("Error: ", err);
      //       } else {
      //         res.send("password updated successfully!");
      //       }
      //     })
      //   }
      // });


      console.log("password: ", password);
      // await db.disconnect();
      return res.status(200).json({ success: true, password });
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
