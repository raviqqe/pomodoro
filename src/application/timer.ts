import { type TimerPresenter } from "./timer-presenter.js";

export class Timer {
  private interval?: NodeJS.Timeout;

  constructor(private readonly presenter: TimerPresenter) {}

  public start(
    duration: number,
    callbacks: {
      endCallback: () => Promise<void> | void;
      tickCallback: () => Promise<void> | void;
    },
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
