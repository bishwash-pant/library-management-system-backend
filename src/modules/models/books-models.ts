import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  description: {
    type: String,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  assignedAt: {
    type: Date,
  },
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  requestedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
export const Book = mongoose.model("Book", bookSchema);
