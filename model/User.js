import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    user: {
      email: { type: String, required: true, unique: true },
      password: { type: String },
      fullname: { type: String },
      image: { type: String },
      isAdmin: { type: Boolean, required: true, default: false },
      resetPasswordToken: { type: String },
      resetPasswordExpire: Date,
    },

    developers: {
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

  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    //check if password is modified
    if (!this.isModified("user.password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.user.password, salt);
    this.user.password = hashPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.user.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
  return resetToken;
};

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
