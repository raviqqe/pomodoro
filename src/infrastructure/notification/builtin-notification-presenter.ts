import { INotificationPresenter } from "../../application/notification-presenter";

export class BuiltinNotificationPresenter implements INotificationPresenter {
  public presentNotification(message: string): void {
    if (Notification.permission === "granted") {
      const notification = new Notification(message, { icon: "/icon192.png" });
      setTimeout(() => notification.close(), 6000);
    }
  }
}
