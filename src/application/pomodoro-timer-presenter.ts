import { type PomodoroTimerState } from "./pomodoro-timer-state";
import { type ITimerPresenter } from "./timer-presenter";

export interface IPomodoroTimerPresenter extends ITimerPresenter {
  presentTime(seconds: number): void;
  presentState(state: PomodoroTimerState): void;
}
