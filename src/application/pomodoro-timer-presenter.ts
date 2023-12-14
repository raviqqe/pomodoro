import { type PomodoroTimerState } from "./pomodoro-timer-state.js";
import { type TimerPresenter } from "./timer-presenter.js";

export interface PomodoroTimerPresenter extends TimerPresenter {
  presentTime(seconds: number): void;
  presentState(state: PomodoroTimerState): void;
}
