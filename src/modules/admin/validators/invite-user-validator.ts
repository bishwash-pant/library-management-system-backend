import { body, validationResult } from "express-validator";


export const inviteUserValidationRules = () => [
    body("email").isEmail().withMessage("Invalid email address"),
];


export const inviteUserValidationErrorHandling = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    next();
};
