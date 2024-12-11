import { type TimerPresenter } from "./timer-presenter.js";

export class Timer {
  private interval?: number;

  constructor(
    private readonly setInterval: (
      callback: () => Promise<void>,
      interval: number,
    ) => number,
    private readonly clearInterval: (id: number) => void,
    private readonly presenter: TimerPresenter,
  ) {}

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
    this.interval = this.setInterval(async () => {
      duration--;

      if (duration < 0) {
        this.presenter.presentStopped(true);

        if (this.interval !== undefined) {
          this.clearInterval(this.interval);
        }
        await callbacks.endCallback();
      } else {
        this.presenter.presentTime(duration);
        await callbacks.tickCallback();
      }
    }, 1000);
  }

  public stop(): void {
    if (this.interval !== undefined) {
      this.clearInterval(this.interval);
    }

    this.presenter.presentStopped(true);
  }
}
