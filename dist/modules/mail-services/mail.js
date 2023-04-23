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
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv").config();
const env = process.env;
const sendMail = () => __awaiter(void 0, void 0, void 0, function* () {
    var transport = nodemailer_1.default.createTransport({
        //@ts-ignore
        host: env.MAIL_HOST,
        port: env.MAIL_PORT,
        auth: {
            user: env.MAIL_USER,
            pass: env.MAIL_PASS,
        },
    });
    // send mail with defined transport object
    try {
        yield transport.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>',
            to: "bar@example.com, baz@example.com",
            subject: "Hello ✔",
            text: "Hello world?",
            html: ' <a href="www.google.com">Click here</a>', // html body
        });
    }
    catch (e) {
        console.log(e);
    }
});
exports.sendMail = sendMail;
//# sourceMappingURL=mail.js.map