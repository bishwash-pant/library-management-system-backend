"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginator = void 0;
const express_paginate_1 = __importDefault(require("express-paginate"));
function paginator(items, req, res) {
    // const limit = Number(req.query.limit);
    const limit = 9;
    const page = Number(req.query.page);
    const skip = Number(req.query.skip) || page - 1;
    const startIndex = Number(skip * limit);
    const endIndex = startIndex + Number(limit);
    console.log({ page, skip, limit, startIndex, endIndex });
    const paginateditems = items.slice(startIndex, endIndex);
    res.json({
        items: paginateditems,
        pageCount: Math.ceil(items.length / limit),
        itemCount: items.length,
        pages: express_paginate_1.default.getArrayPages(req)(Math.ceil(items.length / limit), Math.ceil(items.length / limit), page),
    });
}
exports.paginator = paginator;
//# sourceMappingURL=paginate.js.map