import { type NotificationPresenter } from "./notification-presenter.js";
import { type PerformanceTracker } from "./performance-tracker.js";
import { type PomodoroTimerPresenter } from "./pomodoro-timer-presenter.js";
import { PomodoroTimerState } from "./pomodoro-timer-state.js";
import { Timer } from "./timer.js";

export class PomodoroTimer {
  private readonly timer: Timer;
  private pomodoro = true;
  private breakCount = 0;

  constructor(
    private readonly timerPresenter: PomodoroTimerPresenter,
    private readonly notificationPresenter: NotificationPresenter,
    private readonly performanceTracker: PerformanceTracker,
  ) {
    this.timer = new Timer(timerPresenter);
  }

  public start(): void {
    switch (this.state()) {
      case PomodoroTimerState.Pomodoro:
        this.startPomodoro();
        break;
      case PomodoroTimerState.ShortBreak:
        this.startBreak(5 * 60);
        break;
      case PomodoroTimerState.LongBreak:
        this.startBreak(15 * 60);
        break;
      default:
        throw new Error("unreachable");
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
      endCallback: () => {
        this.pomodoro = false;
        this.presentState();
        this.notificationPresenter.presentNotification("Pomodoro finished!");
      },
      tickCallback: () => this.performanceTracker.addSecond(),
    });
  }

  private startBreak(seconds: number): void {
    this.timer.start(seconds, {
      endCallback: () => {
        this.pomodoro = true;
        this.breakCount++;
        this.presentState();
        this.notificationPresenter.presentNotification("Break finished!");
      },
      tickCallback: () => undefined,
    });
  }

  private presentState() {
    this.timerPresenter.presentState(this.state());
  }
}
