import Router from "express";
import { checkIsAdmin } from "../middlewares/admin-auth-middleware";
import {
  getAllUsersBilling,
  getAssignedBooksBillings,
} from "../billings/billings-controller";
import { fetchUserFromRequest } from "../middlewares/auth-middlewares";
export const billingRouter = Router();
billingRouter.get("/users", checkIsAdmin, getAllUsersBilling);
billingRouter.get("/books", fetchUserFromRequest, getAssignedBooksBillings);
