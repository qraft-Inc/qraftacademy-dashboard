import db from "../../../data/db";
import User from "../../../model/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
 
  const { id } = req.query;

  await db.connect();

  if (req.method === "PUT") {
    console.log("password: ",req.body.password)
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      

      console.log("Hashed password: ",hashPassword)
      const password = await User.findByIdAndUpdate(
        { _id: id },
        { password: hashPassword },
        { new: true }
      );
      
      console.log("database: ", password)
      await db.disconnect();
      return res.status(200).json(password);
    } catch (err) {
      res.status(500).json(err);
    }
  }

}
