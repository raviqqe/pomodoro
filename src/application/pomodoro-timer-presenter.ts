import { type PomodoroTimerState } from "./pomodoro-timer-state.js";
import { type ITimerPresenter } from "./timer-presenter.js";

export interface IPomodoroTimerPresenter extends ITimerPresenter {
  presentTime(seconds: number): void;
  presentState(state: PomodoroTimerState): void;
}
