import { type PomodoroTimer } from "./pomodoro-timer.js";

export class PomodoroTimerStopper {
  private readonly pomodoroTimer: PomodoroTimer;

  constructor(pomodoroTimer: PomodoroTimer) {
    this.pomodoroTimer = pomodoroTimer;
  }

  public stop(): void {
    this.pomodoroTimer.stop();
  }
}
