import { range } from "lodash";
import { sleep } from "../domain/utilities";
import { ITimerPresenter } from "./timer-presenter";

export class Timer {
  private stopped: boolean = true;

  constructor(private readonly presenter: ITimerPresenter) {}

  public async start(duration: number): Promise<void> {
    this.stopped = false;
    this.presenter.presentStopped(false);

    for (const seconds of range(duration, -1, -1)) {
      if (this.stopped) {
        break;
      }

      this.presenter.presentTime(seconds);
      await sleep(1000);
    }

    this.presenter.presentStopped(true);
  }

  public stop(): void {
    this.stopped = true;
  }
}
