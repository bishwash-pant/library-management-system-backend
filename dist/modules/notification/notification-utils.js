"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnseenNotifications = exports.createAdminNotification = exports.createUserNotification = void 0;
const notification_model_1 = require("../models/notification-model");
const user_model_1 = require("../models/user-model");
function createUserNotification(text, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const notification = new notification_model_1.Notification({ text, user: userId });
            yield notification.save();
        }
        catch (e) {
            return e;
        }
    });
}
exports.createUserNotification = createUserNotification;
function createAdminNotification(text) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const admins = yield user_model_1.User.find({ isAdmin: true });
            for (let admin of admins) {
                yield notification_model_1.Notification.create({ text, user: admin._id });
            }
        }
        catch (e) {
            return e;
        }
    });
}
exports.createAdminNotification = createAdminNotification;
function getUnseenNotifications(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const notifications = yield notification_model_1.Notification.find({
                user: req.userId,
                seen: false,
            }).sort({ createdAt: -1 });
            return res.json(notifications);
        }
        catch (e) {
            return res.status(500).json({ error: e });
        }
    });
}
exports.getUnseenNotifications = getUnseenNotifications;
//# sourceMappingURL=notification-utils.js.map