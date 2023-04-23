import express from "express";
import {
  deleteInvitedUser,
  getInvitedUser,
  inviteUser,
} from "../admin/invite/invite-user";
import {
  inviteUserValidationErrorHandling,
  inviteUserValidationRules,
} from "../admin/validators/invite-user-validator";
import { deleteUser } from "../admin/user-actions/delete-user";
import { getUser, getUsers } from "../admin/user-actions/getUsers";
export const adminRouter = express.Router();
adminRouter.get("/user", getUsers);
adminRouter.get("/user/:id", getUser);
adminRouter.delete("/user/:id", deleteUser);
adminRouter.get("/invite", getInvitedUser);
adminRouter.post(
  "/invite",
  inviteUserValidationRules(),
  inviteUserValidationErrorHandling,
  inviteUser
);
adminRouter.delete("/invite/:id", deleteInvitedUser);
