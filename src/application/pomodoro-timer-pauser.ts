import { PomodoroTimer } from "./pomodoro-timer";

export class PomodoroTimerPauser {
  constructor(private readonly pomodoroTimer: PomodoroTimer) {}

  public pause(): void {
    this.pomodoroTimer.pause();
  }
}
