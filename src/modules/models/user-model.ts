import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    defaultValue: Date.now(),
  },
  isAdmin: {
    type: Boolean,
    required: true,
    defaultValue: false,
  },
  salt: {
    type: String,
    required: true,
  },
});
export const User = mongoose.model("User", userSchema);
