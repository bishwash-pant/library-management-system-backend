import jwt from "jsonwebtoken";
import { User } from "../models/user-model";
import {
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED_USER_MESSAGE,
} from "../../common/constants/error-responses";
import { RequestI, ResponseI } from "../../common/interfaces/request-objects";

export const fetchUserFromRequest = async (
  req: RequestI,
  res: ResponseI,
  next: Function
) => {
  const authToken = req.headers["authorization"];

  if (!authToken)
    return res.status(401).json({ message: UNAUTHORIZED_USER_MESSAGE });
  const token = authToken.split(" ");
  if (token.length !== 2 || token[0] !== "Bearer")
    return res.status(401).json({ message: UNAUTHORIZED_USER_MESSAGE });
  try {
    const userId = jwt.verify(token[1], process.env.SECRET_KEY);

    const user = await User.findById(userId);

    if (!user)
      return res.status(401).json({ message: UNAUTHORIZED_USER_MESSAGE });
    req.userId = userId.toString();
  } catch (e) {
    console.log(e);

    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }

  next();
};
