import type { NotificationPresenter } from "./notification-presenter.js";
import type { PerformanceTracker } from "./performance-tracker.js";
import type { PomodoroTimerPresenter } from "./pomodoro-timer-presenter.js";
import type { PomodoroTimerState } from "./pomodoro-timer-state.js";
import type { Timer } from "./timer.js";

export class PomodoroTimer {
  readonly #timer: Timer;
  readonly #timerPresenter: PomodoroTimerPresenter;
  readonly #notificationPresenter: NotificationPresenter;
  readonly #performanceTracker: PerformanceTracker;
  #pomodoro = true;
  #breakCount = 0;

  public constructor(
    timer: Timer,
    timerPresenter: PomodoroTimerPresenter,
    notificationPresenter: NotificationPresenter,
    performanceTracker: PerformanceTracker,
  ) {
    this.#timer = timer;
    this.#timerPresenter = timerPresenter;
    this.#notificationPresenter = notificationPresenter;
    this.#performanceTracker = performanceTracker;
  }

  public start(): void {
    switch (this.#state()) {
      case "longBreak":
        this.#startBreak(15 * 60);
        break;
      case "pomodoro":
        this.#startPomodoro();
        break;
      case "shortBreak":
        this.#startBreak(5 * 60);
        break;
    }
  }

  public stop(): void {
    this.#timer.stop();

    this.#pomodoro = true;
    this.#breakCount = 0;
    this.#presentState();
  }

  #state(): PomodoroTimerState {
    return this.#pomodoro
      ? "pomodoro"
      : (this.#breakCount + 1) % 4 === 0
        ? "longBreak"
        : "shortBreak";
  }

  #startPomodoro(): void {
    this.#timer.start(25 * 60, {
      onEnd: () => {
        this.#pomodoro = false;
        this.#presentState();
        this.#notificationPresenter.presentNotification("Pomodoro finished!");
      },
      onTick: () => this.#performanceTracker.addSecond(),
    });
  }

  #startBreak(seconds: number): void {
    this.#timer.start(seconds, {
      onEnd: () => {
        this.#pomodoro = true;
        this.#breakCount++;
        this.#presentState();
        this.#notificationPresenter.presentNotification("Break finished!");
      },
    });
  }

  #presentState() {
    this.#timerPresenter.presentState(this.#state());
  }
}
