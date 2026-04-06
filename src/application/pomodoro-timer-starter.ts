import type { NotificationInitializer } from "./notification-controller.js";
import type { PomodoroTimer } from "./pomodoro-timer.js";

export class PomodoroTimerStarter {
  readonly #pomodoroTimer: PomodoroTimer;
  readonly #notificationController: NotificationInitializer;

  constructor(
    pomodoroTimer: PomodoroTimer,
    notificationController: NotificationInitializer,
  ) {
    this.#pomodoroTimer = pomodoroTimer;
    this.#notificationController = notificationController;
  }

  async start(): Promise<void> {
    await this.#notificationController.initialize();
    this.#pomodoroTimer.start();
  }
}
