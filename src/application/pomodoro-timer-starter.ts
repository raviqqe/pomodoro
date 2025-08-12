import type { NotificationInitializer } from "./notification-controller.js";
import type { PomodoroTimer } from "./pomodoro-timer.js";

export class PomodoroTimerStarter {
  private readonly pomodoroTimer: PomodoroTimer;
  private readonly notificationController: NotificationInitializer;

  public constructor(
    pomodoroTimer: PomodoroTimer,
    notificationController: NotificationInitializer,
  ) {
    this.pomodoroTimer = pomodoroTimer;
    this.notificationController = notificationController;
  }

  public async start(): Promise<void> {
    await this.notificationController.initialize();
    this.pomodoroTimer.start();
  }
}
