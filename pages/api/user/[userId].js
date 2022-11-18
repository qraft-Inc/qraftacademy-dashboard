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
        const user = await User.find(userId);
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

    // update user
    case "PUT":
      try {
        // const user = await User.findByIdAndUpdate(
        //   { _id: userId },
        //   {
        //     user.email : req.body.user.email,
        //     user.fullname : req.body.user.fullname ,
        //     user.image : req.body.user.image,
        //   },
        //   { new: true }
        // );

        // const user = await User.findOne({userId});
        // await db.disconnect();
        // user.user.email = req.body.user.email;
        // user.user.fullname = req.body.user.fullname;
        // user.user.image = req.body.user.image;
        // await user.save();
        // return res.status(200).json({ success: true, user });
        // }

        if (userId) {
          const user = await User.findByIdAndUpdate(userId, {
            "user.user.email": req.body.user.email,
            "user.user.fullname": req.body.user.fullname,
            "user.user.image": req.body.user.image,
      
          });
       
          return res.status(200).json({ success: true, user });
        }
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
        await User.findByIdAndDelete(userId);
        await db.disconnect();
        return res.status(200).json("Deleted Successfully!");
      } catch (err) {
        return res.status(500).json("Internal server error");
      }
      break;
  }
}
