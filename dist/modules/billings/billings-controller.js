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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssignedBooksBillings = exports.getAllUsersBilling = void 0;
const moment_1 = __importDefault(require("moment"));
const books_models_1 = require("../models/books-models");
const user_model_1 = require("../models/user-model");
const error_responses_1 = require("../../common/constants/error-responses");
const costPerDay = 2;
function getAllUsersBilling(req, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield user_model_1.User.find({ isAdmin: false }, { password: 0, salt: 0 });
            let billingList = [];
            for (let i = 0; i < users.length; i++) {
                const books = yield books_models_1.Book.find({ assignedTo: users[i]._id });
                let billCost = 0;
                for (let j = 0; j < books.length; j++) {
                    const assignedAt = books[j].assignedAt;
                    const today = (0, moment_1.default)();
                    const daysPassed = today.diff(assignedAt, "days");
                    billCost += costPerDay * (daysPassed + 1);
                }
                billingList.push({
                    fullName: users[i].fullName,
                    _id: users[i]._id,
                    billCost,
                });
            }
            return response.json(billingList);
        }
        catch (error) {
            response.status(500).json({ message: error_responses_1.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.getAllUsersBilling = getAllUsersBilling;
function getAssignedBooksBillings(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const costPerDay = 2;
        try {
            const books = yield books_models_1.Book.find({ assignedTo: req.userId });
            let billingList = [];
            for (let i = 0; i < books.length; i++) {
                const assignedAt = books[i].assignedAt;
                const today = (0, moment_1.default)();
                const daysPassed = today.diff(assignedAt, "days");
                const billCost = costPerDay * (daysPassed + 1);
                billingList.push({
                    title: books[i].title,
                    _id: books[i]._id,
                    billCost,
                });
            }
            return res.json(billingList);
        }
        catch (error) {
            res.status(500).json({ message: error_responses_1.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.getAssignedBooksBillings = getAssignedBooksBillings;
//# sourceMappingURL=billings-controller.js.map