import { IPerformanceRecord } from "./performance-record";

export interface IPerformanceRecordRepository {
  create(record: IPerformanceRecord): Promise<void>;
  findOne(date: string): Promise<IPerformanceRecord | null>;
  findManySince(date: string): Promise<IPerformanceRecord[]>;
  update(record: IPerformanceRecord): Promise<void>;
}
