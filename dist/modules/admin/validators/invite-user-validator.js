"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inviteUserValidationErrorHandling = exports.inviteUserValidationRules = void 0;
const express_validator_1 = require("express-validator");
const inviteUserValidationRules = () => [
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email address"),
];
exports.inviteUserValidationRules = inviteUserValidationRules;
const inviteUserValidationErrorHandling = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    next();
};
exports.inviteUserValidationErrorHandling = inviteUserValidationErrorHandling;
//# sourceMappingURL=invite-user-validator.js.map