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
exports.myProfile = exports.changePassword = exports.signUp = exports.logIn = exports.createUser = void 0;
const user_model_1 = require("../models/user-model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hashString_1 = require("../../utils/hashString");
const error_responses_1 = require("../../common/constants/error-responses");
const request_token_1 = require("../models/request-token");
function createUser(attributes) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, fullName } = attributes;
        const user = new user_model_1.User(Object.assign({}, attributes));
        yield user.save();
        return user;
    });
}
exports.createUser = createUser;
function logIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const loginCredentials = Object.assign({}, req.body);
            const user = yield user_model_1.User.findOne({ email: loginCredentials.email });
            if (!user)
                return res.status(401).json({ message: error_responses_1.INVALID_CREDENTIALS });
            const salt = user.salt;
            const hashedPassword = (0, hashString_1.hashString)(loginCredentials.password, salt);
            if (user.password === hashedPassword) {
                const token = jsonwebtoken_1.default.sign(user.id, process.env.SECRET_KEY);
                return res.status(200).json({ "access-token": token });
            }
            else {
                return res.status(401).json({ message: error_responses_1.INVALID_CREDENTIALS });
            }
        }
        catch (e) {
            console.log("error", e);
            res.status(500).json({ message: e._message });
        }
    });
}
exports.logIn = logIn;
//signup the user it takes token and password
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const receivedToken = req.params.token;
        console.log({ receivedToken });
        try {
            const payload = jsonwebtoken_1.default.verify(receivedToken, process.env.SECRET_KEY);
            const invitedUser = yield request_token_1.InvitedUser.findOne({ email: payload["email"] });
            if (!invitedUser) {
                return res.status(401).json({ message: "Invalid token" });
            }
            const email = invitedUser.email;
            const salt = bcrypt_1.default.genSaltSync(10);
            const hashedPassword = yield (0, hashString_1.hashString)(req.body.password, salt);
            const user = new user_model_1.User({
                password: hashedPassword,
                email: email,
                salt: salt,
                fullName: req.body.fullName,
                isAdmin: false,
            });
            const newUser = yield user.save();
            const token = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.SECRET_KEY);
            yield request_token_1.InvitedUser.findOneAndDelete({ email: email });
            return res.status(200).json({ "access-token": token });
        }
        catch (err) {
            console.log("error hai");
            console.log(err);
            res.status(500).json({ message: error_responses_1.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.signUp = signUp;
// function to reset the password of the user
function changePassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { currentPassword, newPassword } = req.body;
        try {
            const user = yield user_model_1.User.findById(req.userId);
            if (user) {
                const oldHashedPassword = (0, hashString_1.hashString)(currentPassword, user.salt);
                if (oldHashedPassword !== user.password)
                    return res.status(403).json({ message: error_responses_1.PASSWORD_NOT_MATCHED });
                yield user.updateOne({ password: (0, hashString_1.hashString)(newPassword, user.salt) });
                return res.status(200).json({ message: "Password updated successfully" });
            }
        }
        catch (e) {
            res.status(403).json({ message: error_responses_1.PASSWORD_NOT_MATCHED });
        }
    });
}
exports.changePassword = changePassword;
function myProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.params.token;
            const userId = req.userId;
            // const id = jwt.verify(token, process.env.SECRET_KEY);
            const userProfile = yield user_model_1.User.findById(userId, { password: 0, salt: 0 });
            return res.status(200).json(userProfile);
        }
        catch (e) {
            return res.status(500).json({ message: error_responses_1.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.myProfile = myProfile;
//# sourceMappingURL=user-operations.js.map