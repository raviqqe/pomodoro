import { INotificationPresenter } from "../../application/notification-presenter";

export class BuiltinNotificationPresenter implements INotificationPresenter {
  public presentNotification(message: string): void {
    if (Notification.permission === "granted") {
      new Notification(message, { icon: "/icon192.png" });
    }
  }
}
