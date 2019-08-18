import { range } from "lodash";
import { sleep } from "../domain/utilities";

export class Timer {
  private paused: boolean = false;

  public async *start(duration: number): AsyncIterable<number> {
    this.paused = false;

    for (const seconds of range(duration, -1, -1)) {
      while (this.paused) {
        await sleep(100);
      }

      yield seconds;
      await sleep(1000);
    }
  }

  public pause(): void {
    this.paused = true;
  }

  public restart(): void {
    this.paused = false;
  }
}
