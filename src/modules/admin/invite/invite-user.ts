import { INTERNAL_SERVER_ERROR } from "../../../common/constants/error-responses";
import {
  RequestI,
  ResponseI,
} from "../../../common/interfaces/request-objects";
import { InvitedUser } from "../../models/request-token";
import jwt from "jsonwebtoken";
import { paginator } from "../../../utils/paginate";
import { User } from "../../models/user-model";

export async function inviteUser(req: RequestI, res: ResponseI) {
  const email = req.body.email;
  try {
    const invitedUser = await InvitedUser.findOne({ email: email });
    if (invitedUser)
      return res.status(409).json({ message: "User already invited" });
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.status(409).json({ message: "User already exists" });
    const payload = { email: email };
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    const newInvitedUser = new InvitedUser({ email: email, token: token });
    await newInvitedUser.save();
    return res.status(200).json({ message: "New User Invited Successfully" });
  } catch (e) {
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
}
export async function getInvitedUser(req: RequestI, res: ResponseI) {
  try {
    const invitedUsers = await InvitedUser.find();
    paginator(invitedUsers, req, res);
  } catch (e) {
    console.log("error");

    console.log(e);
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
}
export async function deleteInvitedUser(req: RequestI, res: ResponseI) {
  const id = req.params.id;
  try {
    const invitedUser = await InvitedUser.findById(id);
    if (invitedUser) {
      await InvitedUser.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ message: "Invited User deleted successfully" });
    }
    return res.status(404).json({ message: "Invited User not found" });
  } catch (e) {
    return res.status(500).json({ message: "Invited User not found" });
  }
}
