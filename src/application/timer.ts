import { range } from "lodash";
import { sleep } from "../domain/utilities";

export class Timer {
  private stopped: boolean = true;

  public async *start(duration: number): AsyncIterable<number> {
    this.stopped = false;

    for (const seconds of range(duration, -1, -1)) {
      if (this.stopped) {
        break;
      }

      yield seconds;
      await sleep(1000);
    }

    this.stopped = true;
  }

  public stop(): void {
    this.stopped = true;
  }
}
