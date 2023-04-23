"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const body_parser_1 = __importDefault(require("body-parser"));
const base_router_1 = require("./modules/routes/base-router");
const express_paginate_1 = __importDefault(require("express-paginate"));
const cors_1 = __importDefault(require("cors"));
require("dotenv").config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
const port = process.env.PORT || 8000;
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
(0, db_1.connectToDatabase)();
app.use(express_paginate_1.default.middleware());
app.use("/api/v1", base_router_1.baseRouter);
//# sourceMappingURL=app.js.map