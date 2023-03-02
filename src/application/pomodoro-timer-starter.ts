import { type INotificationInitializer } from "./notification-controller";
import { type PomodoroTimer } from "./pomodoro-timer";

export class PomodoroTimerStarter {
  constructor(
    private readonly pomodoroTimer: PomodoroTimer,
    private readonly notificationController: INotificationInitializer
  ) {}

  public async start(): Promise<void> {
    await this.notificationController.initialize();
    this.pomodoroTimer.start();
  }
}
