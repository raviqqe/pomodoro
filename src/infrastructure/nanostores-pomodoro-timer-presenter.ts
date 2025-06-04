import { atom } from "nanostores";
import { type PomodoroTimerPresenter } from "../application/pomodoro-timer-presenter.js";
import { PomodoroTimerState } from "../application/pomodoro-timer-state.js";

export class NanostoresPomodoroTimerPresenter
  implements PomodoroTimerPresenter
{
  public readonly seconds = atom(0);
  public readonly state = atom("pomodoro");
  public readonly stopped = atom(true);

  public presentTime(seconds: number): void {
    this.seconds.set(seconds);
  }

  public presentState(state: PomodoroTimerState): void {
    this.state.set(state);
  }

  public presentStopped(stopped: boolean): void {
    this.stopped.set(stopped);
  }
}
