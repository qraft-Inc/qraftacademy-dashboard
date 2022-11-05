import jwt from "jsonwebtoken";

const signToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.admin.email,
      fullname: user.admin.fullname,
      isAdmin: user.admin.isAdmin,
      image: user.admin.image,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};
export { signToken };
