import { map, range } from "@raviqqe/loscore";
import { Duration, DateTime } from "luxon";
import { DateSerializer } from "../domain/date-serializer.js";
import { type PerformanceGraphPresenter } from "./performance-graph-presenter.js";
import { type PerformanceRecordRepository } from "./performance-record-repository.js";

export class PerformanceGraphViewer {
  constructor(
    private readonly performanceRecordRepository: PerformanceRecordRepository,
    private readonly performanceGraphPresenter: PerformanceGraphPresenter,
  ) {}

  public async viewGraph(today: Date = new Date()): Promise<void> {
    const records = await this.performanceRecordRepository.findManySince(
      DateSerializer.serialize(
        DateTime.fromJSDate(today)
          .minus(Duration.fromObject({ months: 1 }))
          .toJSDate(),
      ),
    );

    const firstRecord = records[0];

    this.performanceGraphPresenter.presentGraph({
      data: firstRecord
        ? [
            ...map(
              range(
                DateSerializer.deserialize(firstRecord.date).getTime(),
                today.getTime() + 1,
                Duration.fromObject({ days: 1 }).as("milliseconds"),
              ),
              (milliseconds) => {
                const date: string = DateSerializer.serialize(
                  new Date(milliseconds),
                );
                const record = records.find((record) => record.date === date);

                return {
                  date,
                  pomodoros: record ? record.seconds / 25 / 60 : 0,
                };
              },
            ),
          ]
        : [],
    });
  }
}
