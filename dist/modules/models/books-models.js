"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    assignedAt: {
        type: Date,
    },
    requestedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
exports.Book = mongoose_1.default.model("Book", bookSchema);
//# sourceMappingURL=books-models.js.map