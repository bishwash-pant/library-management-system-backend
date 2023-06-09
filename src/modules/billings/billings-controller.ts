import moment from "moment";
import { RequestI, ResponseI } from "../../common/interfaces/request-objects";
import { Book } from "../models/books-models";
import { User } from "../models/user-model";
import { INTERNAL_SERVER_ERROR } from "../../common/constants/error-responses";
const costPerDay = 2;

export async function getAllUsersBilling(req: RequestI, response: ResponseI) {
  try {
    const users = await User.find({ isAdmin: false }, { password: 0, salt: 0 });

    let billingList = [];
    for (let i = 0; i < users.length; i++) {
      const books = await Book.find({ assignedTo: users[i]._id });

      let billCost = 0;
      for (let j = 0; j < books.length; j++) {
        const assignedAt = books[j].assignedAt;

        const today = moment();

        const daysPassed = today.diff(assignedAt, "days");

        billCost += costPerDay * (daysPassed + 1);
      }
      billingList.push({
        fullName: users[i].fullName,
        _id: users[i]._id,
        billCost,
      });
    }
    return response.json(billingList);
  } catch (error) {
    response.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
}
export async function getAssignedBooksBillings(req: RequestI, res: ResponseI) {
  const costPerDay = 2;
  try {
    const books = await Book.find({ assignedTo: req.userId });

    let billingList = [];
    for (let i = 0; i < books.length; i++) {
      const assignedAt = books[i].assignedAt;

      const today = moment();

      const daysPassed = today.diff(assignedAt, "days");

      const billCost = costPerDay * (daysPassed + 1);
      billingList.push({
        title: books[i].title,
        _id: books[i]._id,
        billCost,
      });
    }

    return res.json(billingList);
  } catch (error) {
    res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
}
