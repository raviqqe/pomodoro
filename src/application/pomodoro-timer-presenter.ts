import { type PomodoroTimerState } from "./pomodoro-timer-state.js";

export interface PomodoroTimerPresenter {
  presentState(state: PomodoroTimerState): void;
}
