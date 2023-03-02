import { type INotificationInitializer } from "../../application/notification-controller";

export class BuiltinNotificationController implements INotificationInitializer {
  public async initialize(): Promise<void> {
    if (Notification.permission === "default") {
      await Notification.requestPermission();
    }
  }
}
