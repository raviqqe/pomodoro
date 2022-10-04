import { INotificationInitializer } from "./notification-initializer";
import { PomodoroTimer } from "./pomodoro-timer";

export class PomodoroTimerStarter {
  constructor(
    private readonly pomodoroTimer: PomodoroTimer,
    private readonly notificationInitializer: INotificationInitializer
  ) {}

  public async start(): Promise<void> {
    await this.notificationInitializer.initialize();
    this.pomodoroTimer.start();
  }
}
