import { PomodoroTimer } from "./pomodoro-timer";

export class PomodoroTimerStarter {
  constructor(private readonly pomodoroTimer: PomodoroTimer) {}

  public async start(): Promise<void> {
    await this.pomodoroTimer.start();
  }
}
