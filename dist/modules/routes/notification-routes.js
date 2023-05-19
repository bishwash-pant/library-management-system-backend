"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_middlewares_1 = require("../middlewares/auth-middlewares");
const notification_utils_1 = require("../notification/notification-utils");
const notification_controllers_1 = require("../notification/notification-controllers");
exports.notificationRouter = (0, express_1.default)();
exports.notificationRouter.get("/unseen", auth_middlewares_1.fetchUserFromRequest, notification_utils_1.getUnseenNotifications);
exports.notificationRouter.delete("/seen/:id", auth_middlewares_1.fetchUserFromRequest, notification_controllers_1.markAsSeen);
exports.notificationRouter.delete("/seen-all", auth_middlewares_1.fetchUserFromRequest, notification_controllers_1.markAllAsSeen);
//# sourceMappingURL=notification-routes.js.map