import db from "../../../data/db";
import User from "../../../model/User";

// display all users
export default async function handler(req, res) {
  const { method } = req;
  const { userId } = req.query;

  await db.connect();

  switch (method) {
    // show one user
    case "GET":
      try {
        const user = await User.find({ _id: userId });
        await db.disconnect();
        return res.status(200).json(user);
      } catch (err) {
        res.status(500).json(err);
      }
      break;

    // update user
    case "PUT":
      try {

        const user = await User.findByIdAndUpdate(
          { _id: userId },
          {
            email: req.body.email,
            fullname: req.body.fullname,
            // telephone: req.body.telephone,
            image: req.body.image,
          },
          { new: true }
        );
        await db.disconnect();
        return res.status(200).json(user);
      } catch (err) {
        res.status(500).json(err);
      }
      break;

    // delete user
    case "DELETE":
      try {
        await User.findByIdAndDelete({ _id: userId });
        await db.disconnect();
        return res.status(200).json("Deleted Successfully!");
      } catch (err) {
        return res.status(500).json("Internal server error");
      }
      break;
  }
}
