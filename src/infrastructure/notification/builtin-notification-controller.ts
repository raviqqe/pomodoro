import type { NotificationInitializer } from "../../application/notification-controller.js";

export class BuiltinNotificationController implements NotificationInitializer {
  async initialize(): Promise<void> {
    if (Notification.permission === "default") {
      await Notification.requestPermission();
    }
  }
}
