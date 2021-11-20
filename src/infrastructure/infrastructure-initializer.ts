import { IInfrastructureInitializer } from "../application/infrastructure-initializer";
import { BuiltinNotificationInitializer } from "./notification/builtin-notification-initializer";

export class InfrastructureInitializer implements IInfrastructureInitializer {
  constructor(
    private readonly notificationInitializer: BuiltinNotificationInitializer
  ) {}

  public async initialize(): Promise<void> {
    await this.notificationInitializer.initialize();
  }
}
