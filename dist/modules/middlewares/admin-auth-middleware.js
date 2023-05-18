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
exports.checkIsAdmin = void 0;
const error_responses_1 = require("../../common/constants/error-responses");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user-model");
const checkIsAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("middleware.checkIsAdmin");
    const authToken = req.headers["authorization"];
    if (!authToken)
        return res.status(401).json({ message: error_responses_1.UNAUTHORIZED_USER_MESSAGE });
    const token = authToken.split(" ");
    if (token.length !== 2 || token[0] !== "Bearer")
        return res.status(401).json({ message: error_responses_1.UNAUTHORIZED_USER_MESSAGE });
    try {
        const id = jsonwebtoken_1.default.verify(token[1], process.env.SECRET_KEY);
        const user = yield user_model_1.User.findOne({ _id: id });
        if (!user)
            return res.status(401).json({ message: error_responses_1.UNAUTHORIZED_USER_MESSAGE });
        if (!user.isAdmin) {
            return res.status(403).json({ message: error_responses_1.NOT_ADMIN });
        }
        req.userId = id.toString();
    }
    catch (e) {
        return res.status(401).json({ message: error_responses_1.UNAUTHORIZED_USER_MESSAGE });
    }
    next();
});
exports.checkIsAdmin = checkIsAdmin;
//# sourceMappingURL=admin-auth-middleware.js.map