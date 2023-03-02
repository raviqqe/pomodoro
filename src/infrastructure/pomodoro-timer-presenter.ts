import { type IPomodoroTimerPresenter } from "../application/pomodoro-timer-presenter.js";
import { PomodoroTimerState } from "../application/pomodoro-timer-state.js";
import { type IRenderer, type IPomodoroTimer } from "./renderer.js";

export class PomodoroTimerPresenter implements IPomodoroTimerPresenter {
  private renderer: IRenderer | null = null;
  private timer: IPomodoroTimer = {
    seconds: 0,
    state: PomodoroTimerState.Pomodoro,
    stopped: true,
  };

  public setRenderer(renderer: IRenderer): void {
    this.renderer = renderer;
  }

  public presentTime(seconds: number): void {
    this.renderTimer({ seconds });
  }

  public presentState(state: PomodoroTimerState): void {
    this.renderTimer({ state });
  }

  public presentStopped(stopped: boolean): void {
    this.renderTimer({ stopped });
  }

  private renderTimer(timer: Partial<IPomodoroTimer>): void {
    this.timer = { ...this.timer, ...timer };

    this.renderer?.renderTimer(this.timer);
  }
}
