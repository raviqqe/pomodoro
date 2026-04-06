import { atom } from "nanostores";
import type { PomodoroTimerPresenter } from "../application/pomodoro-timer-presenter.js";
import type { PomodoroTimerState } from "../application/pomodoro-timer-state.js";

export class NanostoresPomodoroTimerPresenter
  implements PomodoroTimerPresenter
{
  readonly seconds = atom(0);
  readonly state = atom("pomodoro");
  readonly stopped = atom(true);

  presentTime(seconds: number): void {
    this.seconds.set(seconds);
  }

  presentState(state: PomodoroTimerState): void {
    this.state.set(state);
  }

  presentStopped(stopped: boolean): void {
    this.stopped.set(stopped);
  }
}
