import { Timer } from "./timer";

export enum PomodoroTimerState {
  Pomodoro,
  ShortBreak,
  LongBreak
}

export class PomodoroTimer {
  private readonly timer: Timer = new Timer();
  private pomodoro: boolean = true;
  private breakCount: number = 0;

  public start(): AsyncIterable<number> {
    switch (this.state()) {
      case PomodoroTimerState.Pomodoro:
        return this.startPomodoro();
      case PomodoroTimerState.ShortBreak:
        return this.startBreak(5 * 60);
      case PomodoroTimerState.LongBreak:
        return this.startBreak(15 * 60);
    }

    throw new Error("unreachable");
  }

  public pause(): void {
    this.timer.pause();
  }

  public restart(): void {
    this.timer.restart();
  }

  public state(): PomodoroTimerState {
    return this.pomodoro
      ? PomodoroTimerState.Pomodoro
      : (this.breakCount + 1) % 4 === 0
      ? PomodoroTimerState.LongBreak
      : PomodoroTimerState.ShortBreak;
  }

  private async *startPomodoro(): AsyncIterable<number> {
    this.pomodoro = false;
    yield* this.timer.start(25 * 60);
  }

  private async *startBreak(seconds: number): AsyncIterable<number> {
    this.pomodoro = true;
    this.breakCount++;
    yield* this.timer.start(seconds);
  }
}
