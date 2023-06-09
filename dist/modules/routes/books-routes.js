"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = require("express");
const admin_auth_middleware_1 = require("../middlewares/admin-auth-middleware");
const auth_middlewares_1 = require("../middlewares/auth-middlewares");
const admin_controller_1 = require("../books/books-controller/admin-controller");
const user_controller_1 = require("../books/books-controller/user-controller");
exports.bookRouter = (0, express_1.Router)();
exports.bookRouter.post("/", admin_auth_middleware_1.checkIsAdmin, admin_controller_1.addBooks);
exports.bookRouter.delete("/return/:id", auth_middlewares_1.fetchUserFromRequest, user_controller_1.returnBook);
exports.bookRouter.get("/details/:id", admin_auth_middleware_1.checkIsAdmin, admin_controller_1.getBookDetails);
exports.bookRouter.get("/details-basic/:id", auth_middlewares_1.fetchUserFromRequest, admin_controller_1.getBookDetails);
exports.bookRouter.get("/assigned", auth_middlewares_1.fetchUserFromRequest, admin_controller_1.getAllAssignedBooks);
exports.bookRouter.patch("/update/:id", admin_auth_middleware_1.checkIsAdmin, admin_controller_1.updateBook);
exports.bookRouter.delete("/delete/:id", admin_auth_middleware_1.checkIsAdmin, admin_controller_1.deleteBook);
exports.bookRouter.get("/requests", admin_auth_middleware_1.checkIsAdmin, admin_controller_1.getAllRequests);
exports.bookRouter.get("/approve/:id", admin_auth_middleware_1.checkIsAdmin, admin_controller_1.approveRequest);
exports.bookRouter.get("/reject/:id", admin_auth_middleware_1.checkIsAdmin, admin_controller_1.rejectRequest);
exports.bookRouter.delete("/unassign/:id", admin_auth_middleware_1.checkIsAdmin, admin_controller_1.unAssignBook);
exports.bookRouter.get("/", auth_middlewares_1.fetchUserFromRequest, admin_controller_1.getAllBooks);
exports.bookRouter.get("/my-requests/:id", auth_middlewares_1.fetchUserFromRequest, user_controller_1.requestBook);
exports.bookRouter.get("/my-books", auth_middlewares_1.fetchUserFromRequest, user_controller_1.getMyAssignedBooks);
exports.bookRouter.get("/my-requests/", auth_middlewares_1.fetchUserFromRequest, user_controller_1.getMyRequestedBook);
exports.bookRouter.delete("/my-requests/:id", auth_middlewares_1.fetchUserFromRequest, user_controller_1.cancelRequest);
//# sourceMappingURL=books-routes.js.map