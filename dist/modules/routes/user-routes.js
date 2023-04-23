"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_operations_1 = require("../user/user-operations");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/:token", user_operations_1.signUp);
//# sourceMappingURL=user-routes.js.map