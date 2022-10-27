import db from "../../../data/db";
import UserModel from "../../../model/user";


// display all users
export default async function handler(req, res) {
  const { method } = req;

  await db.connect();

  switch (method) {
    // create Admin
    case "POST":
      try {

        const newUser = new UserModel({
          ...req.body,
        });

        const user = await newUser.save();
        await db.disconnect();
        return res.status(201).json({ success: true, user });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });


      }
      break;

    // show all users
    case "GET":
      try {
        const user = await UserModel.find({});
        await db.disconnect();
        return res.status(200).json(user);
      } catch (err) {
        res.status(500).json(err);
      }
      break;
  }
}
