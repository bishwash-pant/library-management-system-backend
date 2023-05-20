import moment from "moment";
import { RequestI, ResponseI } from "../../common/interfaces/request-objects";
import { Book } from "../models/books-models";
import { User } from "../models/user-model";
import { INTERNAL_SERVER_ERROR } from "../../common/constants/error-responses";

export async function getAllUsersBilling(req: RequestI, response: ResponseI) {
  const costPerDay = 0.1;
  try {
    const users = await User.find({}, { password: 0, salt: 0 });

    let billingList = [];
    for (let i = 0; i < users.length; i++) {
      const books = await Book.find({ assignedTo: users[i]._id });

      let billCost = 0;
      for (let j = 0; j < books.length; j++) {
        const createdAt = books[j].createdAt;

        const today = moment();

        const daysPassed = today.diff(createdAt, "days");
        billCost += 0.1 * daysPassed;
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
  const costPerDay = 0.1;
  try {
    const books = await Book.find({ assignedTo: req.userId });

    let billingList = [];
    for (let i = 0; i < books.length; i++) {
      const createdAt = books[i].createdAt;

      const today = moment();

      const daysPassed = today.diff(createdAt, "days");
      const billCost = 0.1 * daysPassed;
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
