import { type PomodoroTimerPresenter } from "../application/pomodoro-timer-presenter.js";
import { PomodoroTimerState } from "../application/pomodoro-timer-state.js";
import { type Renderer, type PomodoroTimer } from "./renderer.js";

export class PomodoroTimerPresenter implements PomodoroTimerPresenter {
  private renderer: Renderer | null = null;
  private timer: PomodoroTimer = {
    seconds: 0,
    state: PomodoroTimerState.Pomodoro,
    stopped: true,
  };

  public setRenderer(renderer: Renderer): void {
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

  private renderTimer(timer: Partial<PomodoroTimer>): void {
    this.timer = { ...this.timer, ...timer };

    this.renderer?.renderTimer(this.timer);
  }
}
