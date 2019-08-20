import { ITimerPresenter } from "./timer-presenter";

export class Timer {
  private interval?: number;

  constructor(private readonly presenter: ITimerPresenter) {}

  public start(duration: number, callback: () => void): void {
    this.presenter.presentStopped(false);
    this.presenter.presentTime(duration);

    this.interval = setInterval(() => {
      duration--;

      if (duration < 0) {
        this.presenter.presentStopped(true);
        clearInterval(this.interval);
        callback();
      } else {
        this.presenter.presentTime(duration);
      }
    }, 1000);
  }

  public stop(): void {
    clearInterval(this.interval);
    this.presenter.presentStopped(true);
  }
}
