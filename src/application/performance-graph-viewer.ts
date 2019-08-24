import { Duration, DateTime } from "luxon";
import { range } from "lodash";
import { DateSerializer } from "../domain/date-serializer";
import { IPerformanceRecordRepository } from "./performance-record-repository";
import { IPerformanceGraphPresenter } from "./performance-graph-presenter";

export class PerformanceGraphViewer {
  constructor(
    private readonly performanceRecordRepository: IPerformanceRecordRepository,
    private readonly performanceGraphPresenter: IPerformanceGraphPresenter
  ) {}

  public async viewGraph(today: Date = new Date()): Promise<void> {
    const records = await this.performanceRecordRepository.findManySince(
      DateSerializer.serialize(
        DateTime.fromJSDate(today)
          .minus(Duration.fromObject({ months: 1 }))
          .toJSDate()
      )
    );

    this.performanceGraphPresenter.presentGraph({
      data: range(
        DateSerializer.deserialize(records[0].date).getTime(),
        today.getTime() + 1,
        Duration.fromObject({ days: 1 }).as("milliseconds")
      ).map(milliseconds => {
        const date: string = DateSerializer.serialize(new Date(milliseconds));
        const record = records.find(record => record.date === date);

        return {
          date,
          pomodoros: record ? record.seconds / 25 / 60 : 0
        };
      })
    });
  }
}
