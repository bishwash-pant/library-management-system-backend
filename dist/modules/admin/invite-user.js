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
exports.inviteUser = void 0;
const error_responses_1 = require("../../common/constants/error-responses");
const request_token_1 = require("../models/request-token");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function inviteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = req.body.email;
        try {
            const invitedUser = yield request_token_1.InvitedUser.findOne({ email: email });
            if (invitedUser)
                return res.status(409).json({ message: "User already invited" });
            const payload = { email: email };
            const token = jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY);
            const newInvitedUser = new request_token_1.InvitedUser({ email: email, token: token });
            yield newInvitedUser.save();
            return res.status(200).json({ message: "New User Invited Successfully" });
        }
        catch (e) {
            return res.status(500).json({ message: error_responses_1.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.inviteUser = inviteUser;
//# sourceMappingURL=invite-user.js.map