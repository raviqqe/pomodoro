import { IInfrastructureInitializer } from "../application/infrastructure-initializer";
import { FirebaseInitializer } from "./firebase/firebase-initializer";
import { BuiltinNotificationInitializer } from "./notification/builtin-notification-initializer";

export class InfrastructureInitializer implements IInfrastructureInitializer {
  constructor(
    private readonly firebaseInitializer: FirebaseInitializer,
    private readonly notificationInitializer: BuiltinNotificationInitializer
  ) {}

  public async initialize(): Promise<void> {
    await this.firebaseInitializer.initialize();
    await this.notificationInitializer.initialize();
  }
}
