import mongoose from "mongoose";
import { INTERNAL_SERVER_ERROR } from "../../../common/constants/error-responses";
import {
  RequestI,
  ResponseI,
} from "../../../common/interfaces/request-objects";
import { paginator } from "../../../utils/paginate";
import { Book } from "../../models/books-models";
import { createUserNotification } from "../../notification/notification-utils";

export async function getAllBooks(req: RequestI, res: ResponseI) {
  try {
    const books = await Book.find();
    paginator(books, req, res);
  } catch (e) {
    res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
}
export async function addBooks(req: RequestI, res: ResponseI) {
  const { title, author, description } = req.body;
  try {
    const book = new Book({ title, author, description });
    await book.save();
    res.status(200).json({ message: "Book saved successfully" });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
}
export async function updateBook(req: RequestI, res: ResponseI) {
  try {
    const id = req.params.id;
    const book = await Book.findByIdAndUpdate(id, req.body);

    if (book) {
      return res.json(book);
    }
    return res.status(404).json({ message: "Book not found" });
  } catch (e) {
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
}
export async function getBookDetails(req: RequestI, res: ResponseI) {
  try {
    const bookId = req.params.id;
    // const book = (await Book.findById(bookId)).populate("assignedTo");
    const book = await Book.findById(bookId)
      .populate("assignedTo", "fullName email")
      .populate("requestedBy", "fullName email")
      .exec();
    if (!book) return res.status(404).json({ message: "Book not found" });
    return res.status(200).json(book);
  } catch (e) {
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
}
export async function deleteBook(req: RequestI, res: ResponseI) {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (book) {
      return res.json({ message: "Book deleted successfully" });
    }
    return res.status(404).json({ message: "404:Book not found" });
  } catch (e) {
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
}
export async function getAllAssignedBooks(req: RequestI, res: ResponseI) {
  try {
    const allAssignedBooks = await Book.find({ assignedTo: { $ne: null } });
    paginator(allAssignedBooks, req, res);
  } catch (e) {
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
}
export async function getAllRequests(req: RequestI, res: ResponseI) {
  try {
    const requests = await Book.find({ requestedBy: { $ne: null } });
    paginator(requests, req, res);
  } catch (e) {
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
}
export async function approveRequest(req: RequestI, res: ResponseI) {
  try {
    const bookId = req.params.id;
    const book = await Book.findOne({
      _id: bookId,
      requestedBy: { $ne: null },
    });
    if (!book) return res.status(404).json({ message: "Request not found" });
    await Book.findByIdAndUpdate(bookId, {
      requestedBy: null,
      assignedTo: book.requestedBy,
      assignedAt: Date.now(),
    });

    const notificationText = ` Your request for Book titled "${book.title}" has been approved`;

    createUserNotification(notificationText, book.requestedBy.toString());
    return res.status(200).json({ message: "Approved Successfull" });
  } catch (e) {
    res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
}
export async function rejectRequest(req: RequestI, res: ResponseI) {
  try {
    const bookId = req.params.id;
    const book = await Book.findOne({
      _id: bookId,
      requestedBy: { $ne: null },
    });
    if (!book) return res.status(404).json({ message: "Request not found" });
    await Book.findByIdAndUpdate(bookId, {
      requestedBy: null,
      requestedAt: null,
    });
    const notificationText = ` Your request for Book titled "${book.title}" has been declined`;
    createUserNotification(notificationText, book.requestedBy.toString());
    return res.json({ message: "Request request declined successfully" });
  } catch (e) {
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
}
export async function unAssignBook(req: RequestI, res: ResponseI) {
  try {
    const bookId = req.params.id;
    const book = await Book.findOne({ _id: bookId, assignedTo: { $ne: null } });
    if (!book) return res.status(404).json({ message: "Request not found" });
    await Book.findByIdAndUpdate(bookId, {
      assignedTo: null,
      assignedAt: null,
    });
    const notificationText = ` Your Book titled "${book.title}" has been deallocated`;
    createUserNotification(notificationText, book.requestedBy.toString());
    return res.json({ message: "Book unassigned successfully" });
  } catch (e) {
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
}
