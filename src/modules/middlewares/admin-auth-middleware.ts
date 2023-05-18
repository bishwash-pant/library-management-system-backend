import {
  NOT_ADMIN,
  UNAUTHORIZED_USER_MESSAGE,
} from "../../common/constants/error-responses";
import { RequestI, ResponseI } from "../../common/interfaces/request-objects";
import jwt from "jsonwebtoken";
import { User } from "../models/user-model";

export const checkIsAdmin = async (
  req: RequestI,
  res: ResponseI,
  next: Function
) => {
  console.log("middleware.checkIsAdmin");

  const authToken = req.headers["authorization"];
  if (!authToken)
    return res.status(401).json({ message: UNAUTHORIZED_USER_MESSAGE });
  const token = authToken.split(" ");
  if (token.length !== 2 || token[0] !== "Bearer")
    return res.status(401).json({ message: UNAUTHORIZED_USER_MESSAGE });
  try {
    const id = jwt.verify(token[1], process.env.SECRET_KEY);
    const user = await User.findOne({ _id: id });

    if (!user)
      return res.status(401).json({ message: UNAUTHORIZED_USER_MESSAGE });
    if (!user.isAdmin) {
      return res.status(403).json({ message: NOT_ADMIN });
    }
    req.userId = id.toString();
  } catch (e) {
    return res.status(401).json({ message: UNAUTHORIZED_USER_MESSAGE });
  }

  next();
};
