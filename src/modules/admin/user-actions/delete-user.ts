import { INTERNAL_SERVER_ERROR } from "../../../common/constants/error-responses";
import {
  RequestI,
  ResponseI,
} from "../../../common/interfaces/request-objects";
import { User } from "../../models/user-model";

export async function deleteUser(req: RequestI, res: ResponseI) {
  const id = req.params.id;
  if (id === req.userId) {
    return res.status(403).json({ message: "Can not delete youself" });
  }

  try {
    const user = await User.findById(id);
    if (user) {
      await User.findOneAndDelete({ _id: id });
      return res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (e) {
    res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
}
