import { milliseconds, subMonths } from "date-fns";
import { range } from "es-toolkit";
import { deserializeDate, serializeDate } from "../domain/date-serializer.js";
import type { PerformanceGraphPresenter } from "./performance-graph-presenter.js";
import type { PerformanceRecordRepository } from "./performance-record-repository.js";

export class PerformanceGraphViewer {
  readonly #performanceRecordRepository: PerformanceRecordRepository;
  readonly #performanceGraphPresenter: PerformanceGraphPresenter;

  public constructor(
    performanceRecordRepository: PerformanceRecordRepository,
    performanceGraphPresenter: PerformanceGraphPresenter,
  ) {
    this.#performanceRecordRepository = performanceRecordRepository;
    this.#performanceGraphPresenter = performanceGraphPresenter;
  }

  public async viewGraph(today: Date = new Date()): Promise<void> {
    const records = await this.#performanceRecordRepository.findManySince(
      serializeDate(subMonths(new Date(today), 1)),
    );

    const firstRecord = records[0];

    this.#performanceGraphPresenter.presentGraph({
      data: firstRecord
        ? range(
            deserializeDate(firstRecord.date).getTime(),
            today.getTime() + 1,
            milliseconds({ days: 1 }),
          ).map((milliseconds) => {
            const date: string = serializeDate(new Date(milliseconds));
            const record = records.find((record) => record.date === date);

            return {
              date,
              pomodoros: record ? record.seconds / 25 / 60 : 0,
            };
          })
        : [],
    });
  }
}
