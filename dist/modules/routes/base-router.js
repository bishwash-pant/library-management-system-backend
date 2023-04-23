"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseRouter = void 0;
const express_1 = require("express");
const user_routes_1 = require("./user-routes");
const auth_routes_1 = require("./auth-routes");
const auth_middlewares_1 = require("../middlewares/auth-middlewares");
const admin_routes_1 = require("./admin-routes");
const admin_auth_middleware_1 = require("../middlewares/admin-auth-middleware");
const books_routes_1 = require("./books-routes");
exports.baseRouter = (0, express_1.Router)();
exports.baseRouter.use("/auth", auth_routes_1.authRouter);
exports.baseRouter.use("/users", auth_middlewares_1.fetchUserFromRequest, user_routes_1.userRouter);
exports.baseRouter.use("/admin", admin_auth_middleware_1.checkIsAdmin, admin_routes_1.adminRouter);
exports.baseRouter.use("/books", books_routes_1.bookRouter);
exports.baseRouter.use((req, res) => {
    console.log(req.path);
    res.status(404).json({ message: "404: Page Not Found" });
});
//# sourceMappingURL=base-router.js.map