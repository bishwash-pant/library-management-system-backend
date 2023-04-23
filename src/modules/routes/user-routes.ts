import { Router } from "express";
import { signUp } from "../user/user-operations";
export const userRouter = Router();
userRouter.post("/:token", signUp);
