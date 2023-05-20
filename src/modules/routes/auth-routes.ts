import { Router } from "express";
import {
  changePassword,
  forgotPassword,
  logIn,
  myProfile,
  resetPassword,
  signUp,
} from "../user/user-controller";
import { fetchUserFromRequest } from "../middlewares/auth-middlewares";
import {
  signUpValidationErrorHandling,
  signUpValidationRules,
} from "../user/validators/signup-validator";
import {
  loginValidationErrorHandling,
  loginValidationRules,
} from "../user/validators/login-validator";
export const authRouter: Router = Router();
authRouter.post(
  "/signup/:token",
  signUpValidationRules(),
  signUpValidationErrorHandling,
  signUp
);
authRouter.post(
  "/login",
  loginValidationRules(),
  loginValidationErrorHandling,
  logIn
);
authRouter.patch("/change-password", fetchUserFromRequest, changePassword);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password/:token", resetPassword);
authRouter.get("/my-profile", fetchUserFromRequest, myProfile);
