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
        await db.connect();
        const body = req.body
        console.log(body)
        const user = await User.findByIdAndUpdate(
          { _id: userId },
          {
            "user.email": req.body.user.email,
            "user.fullname": req.body.user.fullname,
            // "user.telephone": req.body.user.telephone,
            "user.image": req.body.user.image,

          },
          { new: true }
        );
        await db.disconnect();
        return res.status(200).json(user);
      } catch (err) {
        res
          .status(500)
          .json(
            err.response && err.response.data && err.reponse.data.message
              ? err.reponse.data.message
              : err.message
          );
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
