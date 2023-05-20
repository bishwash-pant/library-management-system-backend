import { Router } from "express";
import { userRouter } from "./user-routes";
import { authRouter } from "./auth-routes";
import { fetchUserFromRequest } from "../middlewares/auth-middlewares";
import { adminRouter } from "./admin-routes";
import { checkIsAdmin } from "../middlewares/admin-auth-middleware";
import { bookRouter } from "./books-routes";
import { notificationRouter } from "./notification-routes";
import { billingRouter } from "./billings-router";
export const baseRouter = Router();
baseRouter.use("/auth", authRouter);
baseRouter.use("/users", fetchUserFromRequest, userRouter);
baseRouter.use("/admin", checkIsAdmin, adminRouter);
baseRouter.use("/books", bookRouter);
baseRouter.use("/notifications", notificationRouter);
baseRouter.use("/billings", billingRouter);
baseRouter.use((req, res) => {
  console.log(req.path);

  res.status(404).json({ message: "404: Page Not Found" });
});
