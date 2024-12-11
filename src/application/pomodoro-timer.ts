import { type NotificationPresenter } from "./notification-presenter.js";
import { type PerformanceTracker } from "./performance-tracker.js";
import { type PomodoroTimerPresenter } from "./pomodoro-timer-presenter.js";
import { PomodoroTimerState } from "./pomodoro-timer-state.js";
import { type Timer } from "./timer.js";

export class PomodoroTimer {
  private pomodoro: boolean = true;
  private breakCount: number = 0;

  constructor(
    private readonly timer: Timer,
    private readonly timerPresenter: PomodoroTimerPresenter,
    private readonly notificationPresenter: NotificationPresenter,
    private readonly performanceTracker: PerformanceTracker,
  ) {}

  public start(): void {
    switch (this.state()) {
      case PomodoroTimerState.LongBreak:
        this.startBreak(15 * 60);
        break;
      case PomodoroTimerState.Pomodoro:
        this.startPomodoro();
        break;
      case PomodoroTimerState.ShortBreak:
        this.startBreak(5 * 60);
        break;
    }
  }

  public stop(): void {
    this.timer.stop();

    this.pomodoro = true;
    this.breakCount = 0;
    this.presentState();
  }

  private state(): PomodoroTimerState {
    return this.pomodoro
      ? PomodoroTimerState.Pomodoro
      : (this.breakCount + 1) % 4 === 0
        ? PomodoroTimerState.LongBreak
        : PomodoroTimerState.ShortBreak;
  }

  private startPomodoro(): void {
    this.timer.start(25 * 60, {
      onEnd: () => {
        this.pomodoro = false;
        this.presentState();
        this.notificationPresenter.presentNotification("Pomodoro finished!");
      },
      onTick: () => this.performanceTracker.addSecond(),
    });
  }

  private startBreak(seconds: number): void {
    this.timer.start(seconds, {
      onEnd: () => {
        this.pomodoro = true;
        this.breakCount++;
        this.presentState();
        this.notificationPresenter.presentNotification("Break finished!");
      },
      onTick: () => undefined,
    });
  }

  private presentState() {
    this.timerPresenter.presentState(this.state());
  }
}
