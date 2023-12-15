import { type NotificationPresenter } from "../../application/notification-presenter.js";

export class BuiltinNotificationPresenter implements NotificationPresenter {
  public presentNotification(message: string): void {
    if (Notification.permission === "granted") {
      new Notification(message, { icon: "/icon192.png" });
    }
  }
}
