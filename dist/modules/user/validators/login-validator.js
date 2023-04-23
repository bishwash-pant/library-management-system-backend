"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidationErrorHandling = exports.loginValidationRules = void 0;
const express_validator_1 = require("express-validator");
const loginValidationRules = () => [
    (0, express_validator_1.body)("email").notEmpty().withMessage("Email is required"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
];
exports.loginValidationRules = loginValidationRules;
const loginValidationErrorHandling = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    next();
};
exports.loginValidationErrorHandling = loginValidationErrorHandling;
//# sourceMappingURL=login-validator.js.map