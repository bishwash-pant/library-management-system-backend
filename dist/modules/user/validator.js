"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpValidationErrorHandling = exports.signUpValidationRules = void 0;
const { body, validationResult } = require("express-validator");
const signUpValidationRules = () => [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
        .isLength({ min: 5 })
        .withMessage("Password must be at least 5 characters"),
    body("fullName").notEmpty().withMessage("Full Name required"),
];
exports.signUpValidationRules = signUpValidationRules;
const signUpValidationErrorHandling = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    next();
};
exports.signUpValidationErrorHandling = signUpValidationErrorHandling;
//# sourceMappingURL=validator.js.map