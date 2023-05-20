import { Router } from "express";
import { signUp } from "../user/user-controller";
export const userRouter = Router();
userRouter.post("/:token", signUp);
