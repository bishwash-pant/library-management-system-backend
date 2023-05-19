import { RequestI, ResponseI } from "../../common/interfaces/request-objects";
import { Notification } from "../models/notification-model";

export async function markAsSeen(
  req: RequestI,
  res: ResponseI
): Promise<unknown> {
  try {
    const notificationId = req.params.id;
    const notification = await Notification.findByIdAndUpdate(notificationId, {
      seen: true,
    });
    return res.json(notification);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
}
export async function markAllAsSeen(
  req: RequestI,
  res: ResponseI
): Promise<unknown> {
  try {
    const userId = req.userId;
    await Notification.updateMany({ user: userId }, { seen: true });

    return res.json({ message: "Marked all as seen" });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
}
