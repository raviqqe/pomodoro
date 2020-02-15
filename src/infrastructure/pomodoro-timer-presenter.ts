import { IPomodoroTimerPresenter } from "../application/pomodoro-timer-presenter";
import { PomodoroTimerState } from "../application/pomodoro-timer-state";
import { IRenderer, IPomodoroTimer } from "./renderer";

export class PomodoroTimerPresenter implements IPomodoroTimerPresenter {
  private renderer: IRenderer | null = null;
  private timer: IPomodoroTimer = {
    seconds: 0,
    state: PomodoroTimerState.Pomodoro,
    stopped: true
  };

  public setRenderer(renderer: IRenderer): void {
    this.renderer = renderer;
  }

  public presentTime(seconds: number): void {
    this.timer = { ...this.timer, seconds };

    this.render();
  }

  public presentState(state: PomodoroTimerState): void {
    this.timer = { ...this.timer, state };

    this.render();
  }

  public presentStopped(stopped: boolean): void {
    this.timer = { ...this.timer, stopped };

    this.render();
  }

  private render(): void {
    this.renderer?.renderTimer(this.timer);
  }
}
