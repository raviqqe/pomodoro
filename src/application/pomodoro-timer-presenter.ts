import { type PomodoroTimerState } from "./pomodoro-timer-state.js";
import { type TimerPresenter } from "./timer-presenter.js";

export interface PomodoroTimerPresenter extends TimerPresenter {
  presentState(state: PomodoroTimerState): void;
  presentTime(seconds: number): void;
}
