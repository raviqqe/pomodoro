import { DateSerializer } from "../domain/date-serializer";
import { IPerformanceRecord } from "./performance-record";
import { IPerformanceRecordRepository } from "./performance-record-repository";

const MINUTE = 60;

export class PerformanceTracker {
  private seconds = 0;

  constructor(
    private readonly performanceRecordRepository: IPerformanceRecordRepository
  ) {}

  public async addSecond(): Promise<void> {
    this.seconds++;

    if (this.seconds !== MINUTE) {
      return;
    }

    const date: string = DateSerializer.serialize(new Date());
    const record: IPerformanceRecord | null = await this.performanceRecordRepository.findOne(
      date
    );

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
