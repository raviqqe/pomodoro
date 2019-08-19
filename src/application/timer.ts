import { range } from "lodash";
import { sleep } from "../domain/utilities";
import { ITimerPresenter } from "./timer-presenter";

export class Timer {
  private paused: boolean = false;

  constructor(private readonly presenter: ITimerPresenter) {}

  public async start(duration: number): Promise<void> {
    this.setPaused(false);

    for (const seconds of range(duration, -1, -1)) {
      while (this.paused) {
        await sleep(100);
      }

      this.presenter.presentTime(seconds);
      await sleep(1000);
    }
  }

  public pause(): void {
    this.setPaused(true);
  }

  public restart(): void {
    this.setPaused(false);
  }

  private setPaused(paused: boolean): void {
    this.paused = paused;
    this.presenter.presentPaused(paused);
  }
}
