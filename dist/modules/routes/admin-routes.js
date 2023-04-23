"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
const invite_user_1 = require("../admin/invite/invite-user");
const invite_user_validator_1 = require("../admin/validators/invite-user-validator");
const delete_user_1 = require("../admin/user-actions/delete-user");
const getUsers_1 = require("../admin/user-actions/getUsers");
exports.adminRouter = express_1.default.Router();
exports.adminRouter.get("/user", getUsers_1.getUsers);
exports.adminRouter.get("/user/:id", getUsers_1.getUser);
exports.adminRouter.delete("/user/:id", delete_user_1.deleteUser);
exports.adminRouter.get("/invite", invite_user_1.getInvitedUser);
exports.adminRouter.post("/invite", (0, invite_user_validator_1.inviteUserValidationRules)(), invite_user_validator_1.inviteUserValidationErrorHandling, invite_user_1.inviteUser);
exports.adminRouter.delete("/invite/:id", invite_user_1.deleteInvitedUser);
//# sourceMappingURL=admin-routes.js.map