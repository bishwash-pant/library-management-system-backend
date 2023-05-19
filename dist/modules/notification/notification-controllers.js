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
exports.markAllAsSeen = exports.markAsSeen = void 0;
const notification_model_1 = require("../models/notification-model");
function markAsSeen(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const notificationId = req.params.id;
            const notification = yield notification_model_1.Notification.findByIdAndUpdate(notificationId, {
                seen: true,
            });
            return res.json(notification);
        }
        catch (e) {
            return res.status(500).json({ error: e });
        }
    });
}
exports.markAsSeen = markAsSeen;
function markAllAsSeen(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.userId;
            yield notification_model_1.Notification.updateMany({ user: userId }, { seen: true });
            return res.json({ message: "Marked all as seen" });
        }
        catch (e) {
            return res.status(500).json({ error: e });
        }
    });
}
exports.markAllAsSeen = markAllAsSeen;
//# sourceMappingURL=notification-controllers.js.map