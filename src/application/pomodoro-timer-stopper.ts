import { type PomodoroTimer } from "./pomodoro-timer.js";

export class PomodoroTimerStopper {
  constructor(private readonly pomodoroTimer: PomodoroTimer) {}

  public stop(): void {
    this.pomodoroTimer.stop();
  }
}
