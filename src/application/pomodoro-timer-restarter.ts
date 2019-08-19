import { PomodoroTimer } from "./pomodoro-timer";

export class PomodoroTimerRestarter {
  constructor(private readonly pomodoroTimer: PomodoroTimer) {}

  public restart(): void {
    this.pomodoroTimer.restart();
  }
}
