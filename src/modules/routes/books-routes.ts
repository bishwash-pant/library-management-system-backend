import { Router } from "express";
import { checkIsAdmin } from "../middlewares/admin-auth-middleware";

import { fetchUserFromRequest } from "../middlewares/auth-middlewares";
import {
  addBooks,
  approveRequest,
  deleteBook,
  getAllAssignedBooks,
  getAllBooks,
  getAllRequests,
  getBookDetails,
  rejectRequest,
  unAssignBook,
  updateBook,
} from "../books/books-controller/admin-controller";
import {
  cancelRequest,
  getMyAssignedBooks,
  getMyRequestedBook,
  requestBook,
  returnBook,
} from "../books/books-controller/user-controller";
export const bookRouter = Router();
bookRouter.post("/", checkIsAdmin, addBooks);
bookRouter.delete("/return/:id", fetchUserFromRequest, returnBook);
bookRouter.get("/details/:id", checkIsAdmin, getBookDetails);
bookRouter.get("/details-basic/:id", fetchUserFromRequest, getBookDetails);
bookRouter.get("/assigned", fetchUserFromRequest, getAllAssignedBooks);
bookRouter.patch("/update/:id", checkIsAdmin, updateBook);
bookRouter.delete("/delete/:id", checkIsAdmin, deleteBook);
bookRouter.get("/requests", checkIsAdmin, getAllRequests);
bookRouter.get("/approve/:id", checkIsAdmin, approveRequest);
bookRouter.get("/reject/:id", checkIsAdmin, rejectRequest);
bookRouter.delete("/unassign/:id", checkIsAdmin, unAssignBook);
bookRouter.get("/", fetchUserFromRequest, getAllBooks);
bookRouter.get("/my-requests/:id", fetchUserFromRequest, requestBook);
bookRouter.get("/my-books", fetchUserFromRequest, getMyAssignedBooks);
bookRouter.get("/my-requests/", fetchUserFromRequest, getMyRequestedBook);
bookRouter.delete("/my-requests/:id", fetchUserFromRequest, cancelRequest);
