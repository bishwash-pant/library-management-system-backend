import Router from "express";
import { fetchUserFromRequest } from "../middlewares/auth-middlewares";
import { getUnseenNotifications } from "../notification/notification-utils";
import {
  markAllAsSeen,
  markAsSeen,
} from "../notification/notification-controllers";
export const notificationRouter = Router();
notificationRouter.get("/unseen", fetchUserFromRequest, getUnseenNotifications);
notificationRouter.delete("/seen/:id", fetchUserFromRequest, markAsSeen);
notificationRouter.delete("/seen-all", fetchUserFromRequest, markAllAsSeen);
