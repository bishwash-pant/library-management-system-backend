import { INTERNAL_SERVER_ERROR } from "../../../common/constants/error-responses";
import { RequestI, ResponseI } from "../../../common/interfaces/request-objects";
import { User } from "../../models/user-model";
import paginate from "express-paginate";
import { paginator } from "../../../utils/paginate";
import { mockArray } from "../mock-data";

export async function getUsers(req: RequestI, res: ResponseI) {
  // const users = mockArray;
  try {
    const users = await User.find({}, { password: 0, salt: 0 });

    paginator(users, req, res);
  } catch (e) {
    res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
}
export async function getUser(req: RequestI, res: ResponseI) {
  const id = req.params.id;
  try {
    const user = await User.findById(id, { password: 0, salt: 0 });
    return user
      ? res.status(200).json(user)
      : res.status(404).json({ message: "User not found" });
  } catch (e) {
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
}
