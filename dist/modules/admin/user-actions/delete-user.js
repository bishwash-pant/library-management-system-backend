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
exports.deleteUser = void 0;
const error_responses_1 = require("../../../common/constants/error-responses");
const user_model_1 = require("../../models/user-model");
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        if (id === req.userId) {
            return res.status(403).json({ message: "Can not delete youself" });
        }
        try {
            const user = yield user_model_1.User.findById(id);
            if (user) {
                yield user_model_1.User.findOneAndDelete({ _id: id });
                return res.status(200).json({ message: "User deleted successfully" });
            }
            else {
                res.status(404).json({ message: "User not found" });
            }
        }
        catch (e) {
            res.status(500).json({ message: error_responses_1.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.deleteUser = deleteUser;
//# sourceMappingURL=delete-user.js.map