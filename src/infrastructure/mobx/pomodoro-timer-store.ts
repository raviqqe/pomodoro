import { action, observable } from "mobx";
import { PomodoroTimerState } from "../../application/pomodoro-timer-state";

export class PomodoroTimerStore {
  @observable public seconds: number = 0;
  @observable public paused: boolean = false;
  @observable public state: PomodoroTimerState = PomodoroTimerState.Pomodoro;

  @action
  public setSeconds(seconds: number): void {
    this.seconds = seconds;
  }

  @action
  public setPaused(paused: boolean): void {
    this.paused = paused;
  }

  @action
  public setState(state: PomodoroTimerState): void {
    this.state = state;
  }
}
