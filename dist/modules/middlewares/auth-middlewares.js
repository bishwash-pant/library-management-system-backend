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
exports.fetchUserFromRequest = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user-model");
const error_responses_1 = require("../../common/constants/error-responses");
const fetchUserFromRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("middleware: fetchUserFromRequest");
    const authToken = req.headers["authorization"];
    if (!authToken)
        return res.status(401).json({ message: error_responses_1.UNAUTHORIZED_USER_MESSAGE });
    const token = authToken.split(" ");
    if (token.length !== 2 || token[0] !== "Bearer")
        return res.status(401).json({ message: error_responses_1.UNAUTHORIZED_USER_MESSAGE });
    try {
        console.log("token", token[1]);
        const userId = jsonwebtoken_1.default.verify(token[1], process.env.SECRET_KEY);
        // const id = userId["id"];
        console.log(userId);
        const user = yield user_model_1.User.findById(userId);
        console.log({ user });
        if (!user)
            return res.status(401).json({ message: error_responses_1.UNAUTHORIZED_USER_MESSAGE });
        req.userId = userId.toString();
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: error_responses_1.INTERNAL_SERVER_ERROR });
    }
    next();
});
exports.fetchUserFromRequest = fetchUserFromRequest;
//# sourceMappingURL=auth-middlewares.js.map