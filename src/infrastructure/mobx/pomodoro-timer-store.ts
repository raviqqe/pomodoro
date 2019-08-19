import { action, observable } from "mobx";
import { PomodoroTimerState } from "../../application/pomodoro-timer-state";

export class PomodoroTimerStore {
  @observable public seconds: number = 0;
  @observable public stopped: boolean = true;
  @observable public state: PomodoroTimerState = PomodoroTimerState.Pomodoro;

  @action
  public setSeconds(seconds: number): void {
    this.seconds = seconds;
  }

  @action
  public setStopped(stopped: boolean): void {
    this.stopped = stopped;
  }

  @action
  public setState(state: PomodoroTimerState): void {
    this.state = state;
  }
}
