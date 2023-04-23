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
exports.getUser = exports.getUsers = void 0;
const error_responses_1 = require("../../../common/constants/error-responses");
const user_model_1 = require("../../models/user-model");
const paginate_1 = require("../../../utils/paginate");
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // const users = mockArray;
        try {
            const users = yield user_model_1.User.find({}, { password: 0, salt: 0 });
            (0, paginate_1.paginator)(users, req, res);
        }
        catch (e) {
            res.status(500).json({ message: error_responses_1.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.getUsers = getUsers;
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const user = yield user_model_1.User.findById(id, { password: 0, salt: 0 });
            return user
                ? res.status(200).json(user)
                : res.status(404).json({ message: "User not found" });
        }
        catch (e) {
            return res.status(500).json({ message: error_responses_1.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.getUser = getUser;
//# sourceMappingURL=getUsers.js.map