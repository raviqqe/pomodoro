import { type TimerPresenter } from "./timer-presenter.js";

export class Timer {
  private readonly setInterval: (
    callback: () => void,
    interval: number,
  ) => number;
  private readonly clearInterval: (id: number) => void;
  private readonly presenter: TimerPresenter;
  private interval?: number;

  constructor(
    setInterval: (callback: () => void, interval: number) => number,
    clearInterval: (id: number) => void,
    presenter: TimerPresenter,
  ) {
    this.setInterval = setInterval;
    this.clearInterval = clearInterval;
    this.presenter = presenter;
  }

  public start(
    duration: number,
    {
      onEnd,
      onTick,
    }: {
      onEnd?: () => Promise<void> | void;
      onTick?: () => Promise<void> | void;
    } = {},
  ): void {
    this.presenter.presentStopped(false);
    this.presenter.presentTime(duration);

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.interval = this.setInterval(async () => {
      duration--;

      if (duration < 0) {
        this.presenter.presentStopped(true);

        if (this.interval === undefined) {
          throw new Error("Timer not started");
        }

        this.clearInterval(this.interval);
        await onEnd?.();
      } else {
        this.presenter.presentTime(duration);
        await onTick?.();
      }
    }, 1000);
  }

  public stop(): void {
    if (this.interval === undefined) {
      throw new Error("Timer not started");
    }

    this.clearInterval(this.interval);
    this.presenter.presentStopped(true);
  }
}
