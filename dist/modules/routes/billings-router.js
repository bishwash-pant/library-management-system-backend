"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.billingRouter = void 0;
const express_1 = __importDefault(require("express"));
const admin_auth_middleware_1 = require("../middlewares/admin-auth-middleware");
const billings_controller_1 = require("../billings/billings-controller");
const auth_middlewares_1 = require("../middlewares/auth-middlewares");
exports.billingRouter = (0, express_1.default)();
exports.billingRouter.get("/users", admin_auth_middleware_1.checkIsAdmin, billings_controller_1.getAllUsersBilling);
exports.billingRouter.get("/books", auth_middlewares_1.fetchUserFromRequest, billings_controller_1.getAssignedBooksBillings);
//# sourceMappingURL=billings-router.js.map