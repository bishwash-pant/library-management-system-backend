import paginate from "express-paginate";
import { RequestI, ResponseI } from "../common/interfaces/request-objects";
export function paginator(items, req: RequestI, res: ResponseI) {
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
    pages: paginate.getArrayPages(req)(
      Math.ceil(items.length / limit),
      Math.ceil(items.length / limit),
      page
    ),
  });
}
