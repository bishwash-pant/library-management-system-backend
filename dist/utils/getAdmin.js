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
exports.getAdmin = void 0;
const user_model_1 = require("../modules/models/user-model");
function getAdmin() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const admin = yield user_model_1.User.findOne({ email: "admin@superadmin.com" });
            console.log("get admin", admin);
            if (admin)
                return Promise.resolve(admin._id);
            return Promise.reject("Admin not found");
        }
        catch (e) {
            console.log("admin not found");
            return Promise.reject("Admin not found");
        }
    });
}
exports.getAdmin = getAdmin;
//# sourceMappingURL=getAdmin.js.map