import { RequestI, ResponseI } from "../../common/interfaces/request-objects";
import { Notification } from "../models/notification-model";
import { User } from "../models/user-model";
export async function createUserNotification(
  text: string,
  userId: string
): Promise<unknown> {
  try {
    const notification = new Notification({ text, user: userId });
    await notification.save();
  } catch (e) {
    return e;
  }
}
export async function createAdminNotification(text: string): Promise<unknown> {
  try {
    const admins = await User.find({ isAdmin: true });
    for (let admin of admins) {
      await Notification.create({ text, user: admin._id });
    }
  } catch (e) {
    return e;
  }
}

export async function getUnseenNotifications(
  req: RequestI,
  res: ResponseI
): Promise<unknown> {
  try {
    const notifications = await Notification.find({
      user: req.userId,
      seen: false,
    }).sort({ createdAt: -1 });
    return res.json(notifications);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
}
