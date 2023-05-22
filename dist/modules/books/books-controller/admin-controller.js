"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unAssignBook = exports.rejectRequest = exports.approveRequest = exports.getAllRequests = exports.getAllAssignedBooks = exports.deleteBook = exports.getBookDetails = exports.updateBook = exports.addBooks = exports.getAllBooks = void 0;
const error_responses_1 = require("../../../common/constants/error-responses");
const paginate_1 = require("../../../utils/paginate");
const books_models_1 = require("../../models/books-models");
const notification_utils_1 = require("../../notification/notification-utils");
function getAllBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const books = yield books_models_1.Book.find();
            (0, paginate_1.paginator)(books, req, res);
        }
        catch (e) {
            res.status(500).json({ message: error_responses_1.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.getAllBooks = getAllBooks;
function addBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, author, description } = req.body;
        try {
            const book = new books_models_1.Book({ title, author, description });
            yield book.save();
            res.status(200).json({ message: "Book saved successfully" });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: error_responses_1.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.addBooks = addBooks;
function updateBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const book = yield books_models_1.Book.findByIdAndUpdate(id, req.body);
            if (book) {
                return res.json(book);
            }
            return res.status(404).json({ message: "Book not found" });
        }
        catch (e) {
            return res.status(500).json({ message: error_responses_1.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.updateBook = updateBook;
function getBookDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bookId = req.params.id;
            // const book = (await Book.findById(bookId)).populate("assignedTo");
            const book = yield books_models_1.Book.findById(bookId)
                .populate("assignedTo", "fullName email")
                .populate("requestedBy", "fullName email")
                .exec();
            if (!book)
                return res.status(404).json({ message: "Book not found" });
            return res.status(200).json(book);
        }
        catch (e) {
            return res.status(500).json({ message: error_responses_1.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.getBookDetails = getBookDetails;
function deleteBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const book = yield books_models_1.Book.findByIdAndDelete(req.params.id);
            if (book) {
                return res.json({ message: "Book deleted successfully" });
            }
            return res.status(404).json({ message: "404:Book not found" });
        }
        catch (e) {
            return res.status(500).json({ message: error_responses_1.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.deleteBook = deleteBook;
function getAllAssignedBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allAssignedBooks = yield books_models_1.Book.find({ assignedTo: { $ne: null } });
            (0, paginate_1.paginator)(allAssignedBooks, req, res);
        }
        catch (e) {
            return res.status(500).json({ message: error_responses_1.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.getAllAssignedBooks = getAllAssignedBooks;
function getAllRequests(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const requests = yield books_models_1.Book.find({ requestedBy: { $ne: null } });
            (0, paginate_1.paginator)(requests, req, res);
        }
        catch (e) {
            return res.status(500).json({ message: error_responses_1.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.getAllRequests = getAllRequests;
function approveRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bookId = req.params.id;
            const book = yield books_models_1.Book.findOne({
                _id: bookId,
                requestedBy: { $ne: null },
            });
            if (!book)
                return res.status(404).json({ message: "Request not found" });
            yield books_models_1.Book.findByIdAndUpdate(bookId, {
                requestedBy: null,
                assignedTo: book.requestedBy,
                assignedAt: Date.now(),
            });
            const notificationText = ` Your request for Book titled "${book.title}" has been approved`;
            (0, notification_utils_1.createUserNotification)(notificationText, book.requestedBy.toString());
            return res.status(200).json({ message: "Approved Successfull" });
        }
        catch (e) {
            res.status(500).json({ message: error_responses_1.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.approveRequest = approveRequest;
function rejectRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bookId = req.params.id;
            const book = yield books_models_1.Book.findOne({
                _id: bookId,
                requestedBy: { $ne: null },
            });
            if (!book)
                return res.status(404).json({ message: "Request not found" });
            yield books_models_1.Book.findByIdAndUpdate(bookId, {
                requestedBy: null,
                requestedAt: null,
            });
            const notificationText = ` Your request for Book titled "${book.title}" has been declined`;
            (0, notification_utils_1.createUserNotification)(notificationText, book.requestedBy.toString());
            return res.json({ message: "Request request declined successfully" });
        }
        catch (e) {
            return res.status(500).json({ message: error_responses_1.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.rejectRequest = rejectRequest;
function unAssignBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bookId = req.params.id;
            const book = yield books_models_1.Book.findOne({ _id: bookId, assignedTo: { $ne: null } });
            if (!book)
                return res.status(404).json({ message: "Request not found" });
            yield books_models_1.Book.findByIdAndUpdate(bookId, {
                assignedTo: null,
                assignedAt: null,
            });
            const notificationText = ` Your Book titled "${book.title}" has been deallocated`;
            (0, notification_utils_1.createUserNotification)(notificationText, book.requestedBy.toString());
            return res.json({ message: "Book unassigned successfully" });
        }
        catch (e) {
            return res.status(500).json({ message: error_responses_1.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.unAssignBook = unAssignBook;
//# sourceMappingURL=admin-controller.js.map