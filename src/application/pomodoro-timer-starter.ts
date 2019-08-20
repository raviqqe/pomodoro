import { PomodoroTimer } from "./pomodoro-timer";

export class PomodoroTimerStarter {
  constructor(private readonly pomodoroTimer: PomodoroTimer) {}

  public start(): void {
    this.pomodoroTimer.start();
  }
}
