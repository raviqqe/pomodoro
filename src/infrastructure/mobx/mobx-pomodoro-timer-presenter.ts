import { IPomodoroTimerPresenter } from "../../application/pomodoro-timer-presenter";
import { PomodoroTimerState } from "../../application/pomodoro-timer-state";
import { PomodoroTimerStore } from "./pomodoro-timer-store";

export class MobxPomodoroTimerPresenter implements IPomodoroTimerPresenter {
  constructor(private readonly store: PomodoroTimerStore) {}

  public presentTime(seconds: number): void {
    this.store.setSeconds(seconds);
  }

  public presentPaused(paused: boolean): void {
    this.store.setPaused(paused);
  }

  public presentState(state: PomodoroTimerState): void {
    this.store.setState(state);
  }
}
