import { INotificationInitializer } from "../../application/notification-initializer";

export class BuiltinNotificationInitializer
  implements INotificationInitializer
{
  public async initialize(): Promise<void> {
    if (Notification.permission === "default") {
      await Notification.requestPermission();
    }
  }
}
