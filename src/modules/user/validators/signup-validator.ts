const { body, validationResult } = require("express-validator");

export const signUpValidationRules = () => [
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters"),
  body("fullName").notEmpty().withMessage("Full Name required"),
];

export const signUpValidationErrorHandling = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  next();
};
