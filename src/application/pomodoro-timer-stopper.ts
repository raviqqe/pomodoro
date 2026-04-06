import type { PomodoroTimer } from "./pomodoro-timer.js";

export class PomodoroTimerStopper {
  readonly #pomodoroTimer: PomodoroTimer;

  constructor(pomodoroTimer: PomodoroTimer) {
    this.#pomodoroTimer = pomodoroTimer;
  }

  stop(): void {
    this.#pomodoroTimer.stop();
  }
}
