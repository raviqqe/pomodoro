import { Duration, DateTime } from "luxon";
import { DateSerializer } from "../domain/date-serializer";
import { IPerformanceRecordRepository } from "./performance-record-repository";
import { IPerformanceGraphPresenter } from "./performance-graph-presenter";

export class PerformanceGraphViewer {
  constructor(
    private readonly performanceRecordRepository: IPerformanceRecordRepository,
    private readonly performanceGraphPresenter: IPerformanceGraphPresenter
  ) {}

  public async viewGraph(): Promise<void> {
    const records = await this.performanceRecordRepository.findManySince(
      DateSerializer.serialize(
        DateTime.fromJSDate(new Date())
          .minus(Duration.fromObject({ months: 1 }))
          .toJSDate()
      )
    );

    this.performanceGraphPresenter.presentGraph({
      points: records.map(({ date, seconds }) => ({
        date,
        pomodoros: seconds / 25 / 60
      }))
    });
  }
}
