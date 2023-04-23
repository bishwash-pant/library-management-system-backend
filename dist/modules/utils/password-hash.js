"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashString = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
function hashString(str) {
    const saltRounds = 10;
    return bcrypt_1.default.genSalt(saltRounds).then();
}
exports.hashString = hashString;
//# sourceMappingURL=password-hash.js.map