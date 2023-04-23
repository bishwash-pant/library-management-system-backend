"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSalt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const getSalt = () => bcrypt_1.default.genSaltSync(10);
exports.getSalt = getSalt;
//# sourceMappingURL=salt.js.map