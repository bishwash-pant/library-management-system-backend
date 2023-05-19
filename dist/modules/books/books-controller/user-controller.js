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
exports.returnBook = exports.cancelRequest = exports.getMyAssignedBooks = exports.getMyRequestedBook = exports.requestBook = void 0;
const error_responses_1 = require("../../../common/constants/error-responses");
const paginate_1 = require("../../../utils/paginate");
const books_models_1 = require("../../models/books-models");
const user_model_1 = require("../../models/user-model");
const notification_utils_1 = require("../../notification/notification-utils");
function requestBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const user = yield user_model_1.User.findById(req.userId);
            const book = yield books_models_1.Book.findById(id);
            if (book) {
                if (book.requestedBy)
                    return res
                        .status(409)
                        .json({ message: "Book already requested by another user" });
                if (book.assignedTo)
                    return res
                        .status(409)
                        .json({ message: "Book already assigned to another user" });
                yield books_models_1.Book.findByIdAndUpdate(id, {
                    requestedBy: req.userId,
                    requestedAt: Date.now(),
                });
                const text = `Request for book titled ${book.title} was made by ${user.fullName}`;
                (0, notification_utils_1.createAdminNotification)(text);
                return res.json({ message: "Book requested successfully" });
            }
            return res.status(404).json({ message: "Book not found" });
        }
        catch (err) {
            return res.status(500).json({ message: error_responses_1.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.requestBook = requestBook;
function getMyRequestedBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.userId;
            const requestedBook = yield books_models_1.Book.find({ requestedBy: userId });
            (0, paginate_1.paginator)(requestedBook, req, res);
        }
        catch (e) {
            return res.status(500).json({ message: error_responses_1.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.getMyRequestedBook = getMyRequestedBook;
function getMyAssignedBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const assignedBooks = yield books_models_1.Book.find({ assignedTo: req.userId });
            (0, paginate_1.paginator)(assignedBooks, req, res);
        }
        catch (e) {
            res.status(500).json({ message: error_responses_1.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.getMyAssignedBooks = getMyAssignedBooks;
function cancelRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.userId;
            const bookId = req.params.id;
            const user = yield user_model_1.User.findById(userId);
            const book = yield books_models_1.Book.findOne({ _id: bookId, requestedBy: userId });
            if (!book)
                return res.status(404).json({ message: "Request not found" });
            yield books_models_1.Book.findByIdAndUpdate(bookId, {
                requestedBy: null,
                requestedAt: null,
            });
            const text = `Request for book titled ${book.title} was canceled by ${user.fullName}`;
            (0, notification_utils_1.createAdminNotification)(text);
            return res.json({ message: "Request cancelled successfully" });
        }
        catch (e) {
            return res.status(500).json({ message: error_responses_1.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.cancelRequest = cancelRequest;
function returnBook(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const book = yield books_models_1.Book.findById(id);
            if (book) {
                if (((_a = book.assignedTo) === null || _a === void 0 ? void 0 : _a.toString()) !== req.userId)
                    return res.status(409).json({ message: "Book not assigned to you" });
                yield books_models_1.Book.findByIdAndUpdate(id, {
                    assignedTo: null,
                    requestedAt: null,
                });
                return res.json({ message: "Book returned successfully" });
            }
            return res.status(404).json({ message: "Book not found" });
        }
        catch (err) {
            return res.status(500).json({ message: error_responses_1.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.returnBook = returnBook;
//# sourceMappingURL=user-controller.js.map