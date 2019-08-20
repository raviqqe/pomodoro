import { Timer } from "./timer";
import { IPomodoroTimerPresenter } from "./pomodoro-timer-presenter";
import { PomodoroTimerState } from "./pomodoro-timer-state";

export class PomodoroTimer {
  private readonly timer: Timer;
  private pomodoro: boolean = true;
  private breakCount: number = 0;

  constructor(private readonly presenter: IPomodoroTimerPresenter) {
    this.timer = new Timer(presenter);
  }

  public async start(): Promise<void> {
    switch (this.state()) {
      case PomodoroTimerState.Pomodoro:
        await this.startPomodoro();
        break;
      case PomodoroTimerState.ShortBreak:
        await this.startBreak(5 * 60);
        break;
      case PomodoroTimerState.LongBreak:
        await this.startBreak(15 * 60);
        break;
      default:
        throw new Error("unreachable");
    }
  }

  public stop(): void {
    this.pomodoro = true;
    this.breakCount = 0;

    this.timer.stop();
  }

  private state(): PomodoroTimerState {
    return this.pomodoro
      ? PomodoroTimerState.Pomodoro
      : (this.breakCount + 1) % 4 === 0
      ? PomodoroTimerState.LongBreak
      : PomodoroTimerState.ShortBreak;
  }

  private async startPomodoro(): Promise<void> {
    this.pomodoro = false;

    await this.timer.start(25 * 60);

    this.presentState();
  }

  private async startBreak(seconds: number): Promise<void> {
    this.pomodoro = true;
    this.breakCount++;

    await this.timer.start(seconds);

    this.presentState();
  }

  private presentState() {
    this.presenter.presentState(this.state());
  }
}
