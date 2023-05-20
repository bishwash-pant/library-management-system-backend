import { INTERNAL_SERVER_ERROR } from "../../../common/constants/error-responses";
import {
  RequestI,
  ResponseI,
} from "../../../common/interfaces/request-objects";
import { paginator } from "../../../utils/paginate";
import { Book } from "../../models/books-models";
import { User } from "../../models/user-model";
import { createAdminNotification } from "../../notification/notification-utils";
export async function requestBook(req: RequestI, res: ResponseI) {
  try {
    const id = req.params.id;
    const user = await User.findById(req.userId);
    const book = await Book.findById(id);
    if (book) {
      if (book.requestedBy)
        return res
          .status(409)
          .json({ message: "Book already requested by another user" });

      if (book.assignedTo)
        return res
          .status(409)
          .json({ message: "Book already assigned to another user" });

      await Book.findByIdAndUpdate(id, {
        requestedBy: req.userId,
        requestedAt: Date.now(),
      });
      const text = `Request for book titled ${book.title} was made by ${user.fullName}`;
      createAdminNotification(text);
      return res.json({ message: "Book requested successfully" });
    }
    return res.status(404).json({ message: "Book not found" });
  } catch (err) {
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
}

export async function getMyRequestedBook(req: RequestI, res: ResponseI) {
  try {
    const userId = req.userId;
    const requestedBook = await Book.find({ requestedBy: userId });
    paginator(requestedBook, req, res);
  } catch (e) {
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
}
export async function getMyAssignedBooks(req: RequestI, res: ResponseI) {
  try {
    const assignedBooks = await Book.find({ assignedTo: req.userId });
    paginator(assignedBooks, req, res);
  } catch (e) {
    res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
}

export async function cancelRequest(req: RequestI, res: ResponseI) {
  try {
    const userId = req.userId;
    const bookId = req.params.id;
    const user = await User.findById(userId);
    const book = await Book.findOne({ _id: bookId, requestedBy: userId });
    if (!book) return res.status(404).json({ message: "Request not found" });
    await Book.findByIdAndUpdate(bookId, {
      requestedBy: null,
      requestedAt: null,
    });
    const text = `Request for book titled ${book.title} was canceled by ${user.fullName}`;
    createAdminNotification(text);
    return res.json({ message: "Request cancelled successfully" });
  } catch (e) {
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
}
export async function returnBook(req: RequestI, res: ResponseI) {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    if (book) {
      if (book.assignedTo?.toString() !== req.userId)
        return res.status(409).json({ message: "Book not assigned to you" });

      await Book.findByIdAndUpdate(id, {
        assignedTo: null,
        requestedAt: null,
      });
      const user = await User.findById(req.userId);
      const text = `Request for book titled ${book.title} was returned by ${user.fullName}`;
      createAdminNotification(text);
      return res.json({ message: "Book returned successfully" });
    }
    return res.status(404).json({ message: "Book not found" });
  } catch (err) {
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
}
