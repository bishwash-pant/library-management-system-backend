import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
export const InvitedUser = mongoose.model("InvitedUser", tokenSchema);
