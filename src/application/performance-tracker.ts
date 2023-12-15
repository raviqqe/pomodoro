import { DateSerializer } from "../domain/date-serializer.js";
import { type PerformanceRecordRepository } from "./performance-record-repository.js";
import { type PerformanceRecord } from "./performance-record.js";

const MINUTE = 60;

export class PerformanceTracker {
  private seconds = 0;

  constructor(
    private readonly performanceRecordRepository: PerformanceRecordRepository,
  ) {}

  public async addSecond(): Promise<void> {
    this.seconds++;

    if (this.seconds !== MINUTE) {
      return;
    }

    const date: string = DateSerializer.serialize(new Date());
    const record: PerformanceRecord | null =
      await this.performanceRecordRepository.findOne(date);

    if (record) {
      await this.performanceRecordRepository.update({
        date,
        seconds: record.seconds + MINUTE,
      });
    } else {
      await this.performanceRecordRepository.create({ date, seconds: MINUTE });
    }

    this.seconds = 0;
  }
}
