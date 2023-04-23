import { body, validationResult } from "express-validator";
import { RequestI, ResponseI } from "../../../common/interfaces/request-objects";

export const loginValidationRules = () => [
  body("email").notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const loginValidationErrorHandling = (
  req: RequestI,
  res: ResponseI,
  next: Function
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  next();
};
