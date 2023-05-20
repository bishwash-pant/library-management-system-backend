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
exports.seedSuperAdmin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../modules/models/user-model");
const user_controller_1 = require("../modules/user/user-controller");
const hashString_1 = require("./hashString");
const seedSuperAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const ADMIN_FULLNAME = "Super Admin";
    const ADMIN_EMAIL = "admin@superadmin.com";
    const ADMIN_PASSWORD = "Pass@123";
    const newAdmin = {
        fullName: ADMIN_FULLNAME,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        isAdmin: true,
    };
    try {
        console.log("Starting to Super User");
        const admin = yield user_model_1.User.findOne({ email: ADMIN_EMAIL });
        if (admin) {
            console.log("Seeded Super User");
            return;
        }
        const salt = bcrypt_1.default.genSaltSync(10);
        const hashedPassword = (0, hashString_1.hashString)(newAdmin.password, salt);
        const superAdmin = (0, user_controller_1.createUser)(Object.assign(Object.assign({}, newAdmin), { salt: salt, password: hashedPassword }));
        console.log("Seeding Super User");
    }
    catch (e) {
        console.log(e);
    }
});
exports.seedSuperAdmin = seedSuperAdmin;
//# sourceMappingURL=seed-user.js.map