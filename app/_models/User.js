import "server-only";

import mongoose from "mongoose";
import countries from "../_helpers/countries";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      maxlength: 20,
    },
    lastName: {
      type: String,
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      maxlength: 20,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
      maxlength: 20,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordTokenExpirationDate: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    postCode: {
      type: String,
      maxlength: 10,
    },
    address: {
      type: String,
      maxlength: 20,
    },
    city: {
      type: String,
      maxlength: 20,
    },
    country: {
      type: String,
      enum: countries,
    },
    phoneNumber: {
      type: String,
      maxlength: 20,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (password) {
  const isCorrect = await bcrypt.compare(password, this.password);
  return isCorrect;
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
