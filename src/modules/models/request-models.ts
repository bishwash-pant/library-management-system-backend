import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});
export const Request = mongoose.model("Request", requestSchema);
