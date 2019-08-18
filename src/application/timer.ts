import { range } from "lodash";
import { sleep } from "../domain/utilities";

export class Timer {
  private stopped: boolean = true;

  public countDownPomodoro(): AsyncIterable<number> {
    return this.countDownMinutes(25);
  }

  public countDownBreak(): AsyncIterable<number> {
    return this.countDownMinutes(5);
  }

  public stop(): void {
    this.stopped = true;
  }

  private async *countDownMinutes(minutes: number): AsyncIterable<number> {
    this.stopped = false;

    for (const seconds of range(minutes * 60, -1, -1)) {
      if (this.stopped) {
        break;
      }

      yield seconds;
      await sleep(1000);
    }

    this.stopped = true;
  }
}
