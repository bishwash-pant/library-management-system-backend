"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginator = void 0;
const express_paginate_1 = __importDefault(require("express-paginate"));
function paginator(users, req, res) {
    const limit = Number(req.query.limit);
    const skip = Number(req.query.skip);
    const page = Number(req.query.page);
    const startIndex = Number(skip ? parseInt(skip.toString(), 10) : 0);
    const endIndex = startIndex + Number(limit);
    const paginatedUsers = users.slice(startIndex, endIndex);
    res.json({
        users: paginatedUsers,
        pageCount: Math.ceil(users.length / limit),
        itemCount: users.length,
        pages: express_paginate_1.default.getArrayPages(req)(Math.ceil(users.length / limit), Math.ceil(users.length / limit), page),
    });
}
exports.paginator = paginator;
//# sourceMappingURL=paginate.js.map