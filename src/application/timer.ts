import { ITimerPresenter } from "./timer-presenter";

export class Timer {
  private interval?: number;

  constructor(private readonly presenter: ITimerPresenter) {}

  public start(
    duration: number,
    callbacks: {
      tickCallback: () => Promise<void>;
      endCallback: () => Promise<void>;
    }
  ): void {
    this.presenter.presentStopped(false);
    this.presenter.presentTime(duration);

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.interval = setInterval(async () => {
      duration--;

      if (duration < 0) {
        this.presenter.presentStopped(true);
        clearInterval(this.interval);
        await callbacks.endCallback();
      } else {
        this.presenter.presentTime(duration);
        await callbacks.tickCallback();
      }
    }, 1000);
  }

  public stop(): void {
    clearInterval(this.interval);
    this.presenter.presentStopped(true);
  }
}
