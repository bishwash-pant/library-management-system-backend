"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const user_operations_1 = require("../user/user-operations");
const auth_middlewares_1 = require("../middlewares/auth-middlewares");
const signup_validator_1 = require("../user/validators/signup-validator");
const login_validator_1 = require("../user/validators/login-validator");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post("/signup/:token", (0, signup_validator_1.signUpValidationRules)(), signup_validator_1.signUpValidationErrorHandling, user_operations_1.signUp);
exports.authRouter.post("/login", (0, login_validator_1.loginValidationRules)(), login_validator_1.loginValidationErrorHandling, user_operations_1.logIn);
exports.authRouter.patch("/change-password", auth_middlewares_1.fetchUserFromRequest, user_operations_1.changePassword);
exports.authRouter.get("/my-profile", auth_middlewares_1.fetchUserFromRequest, user_operations_1.myProfile);
//# sourceMappingURL=auth-routes.js.map