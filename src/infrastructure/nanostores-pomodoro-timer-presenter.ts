import { map } from "nanostores";
import { type PomodoroTimerPresenter } from "../application/pomodoro-timer-presenter.js";
import { PomodoroTimerState } from "../application/pomodoro-timer-state.js";
import { type PomodoroTimer } from "./renderer.js";

export class NanostoresPomodoroTimerPresenter implements PomodoroTimerPresenter {
  public readonly timer = map<PomodoroTimer>({
    seconds: 0,
    state: PomodoroTimerState.Pomodoro,
    stopped: true,
  });

  public presentTime(seconds: number): void {
    this.timer.setKey("seconds", seconds);
  }

  public presentState(state: PomodoroTimerState): void {
    this.timer.setKey("state", state);
  }

  public presentStopped(stopped: boolean): void {
    this.timer.setKey("stopped", stopped);
  }
}
