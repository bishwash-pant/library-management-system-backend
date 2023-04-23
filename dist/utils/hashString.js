"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashString = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
function hashString(str, salt) {
    try {
        const hash = bcrypt_1.default.hashSync(str, salt);
        return hash;
    }
    catch (e) {
        return e;
    }
}
exports.hashString = hashString;
//# sourceMappingURL=hashString.js.map