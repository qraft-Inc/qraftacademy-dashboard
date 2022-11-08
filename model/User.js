import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    admin: {
      email: { type: String, required: true, unique: true },
      password: { type: String },
      // fullname: { type: String },
      // image: { type: String },
      isAdmin: { type: Boolean, required: true, default: false },
    },
    developers: {
      fullname: { type: String },
      image: { type: String },
      telephone: { type: String },
      cv: { type: String },
      letter: { type: String },
      program: { type: String },
      course: { type: String },
      stack: { type: String },
      position: { type: String },
      textarea1: { type: String },
      textarea2: { type: String },
      textarea3: { type: String },
      textarea4: { type: String },
      textarea5: { type: String },
      role: { type: String },
      textarea6: { type: String },
      textarea7: { type: String },
    },
    marketing: {
      fullname: { type: String },
      image: { type: String },
      telephone: { type: String },
      cv: { type: String },
      letter: { type: String },
      linkedin: { type: String },
      textarea1: { type: String },
      textarea2: { type: String },
      textarea3: { type: String },
      textarea4: { type: String },
      textarea5: { type: String },
      role: { type: String },
      textarea6: { type: String },
      textarea7: { type: String },
    },
    designers: {
      fullname: { type: String },
      image: { type: String },
      telephone: { type: String },
      cv: { type: String },
      letter: { type: String },
      program: { type: String },
      textarea1: { type: String },
      textarea2: { type: String },
      textarea3: { type: String },
      textarea4: { type: String },
      textarea5: { type: String },
      role: { type: String },
      textarea6: { type: String },
      textarea7: { type: String },
    },
  },
  {
    timestamps: true,
    resetPasswordToken: { type: String },
    resetPasswordExpire: Date
  }
);

userSchema.pre("save", async function (next) {
  try {

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.admin.password, salt);
    this.admin.password = hashPassword
    next()
  }
  catch (error) {
    next(error)
  }
})



const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
