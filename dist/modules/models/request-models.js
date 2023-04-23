"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const requestSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    book: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Book",
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
});
exports.Request = mongoose_1.default.model("Request", requestSchema);
//# sourceMappingURL=request-models.js.map