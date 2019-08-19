import { PomodoroTimerState } from "./pomodoro-timer-state";
import { ITimerPresenter } from "./timer-presenter";

export interface IPomodoroTimerPresenter extends ITimerPresenter {
  presentTime(seconds: number): void;
  presentState(state: PomodoroTimerState): void;
}
