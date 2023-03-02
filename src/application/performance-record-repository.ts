import { type IPerformanceRecord } from "./performance-record.js";

export interface IPerformanceRecordRepository {
  create(record: IPerformanceRecord): Promise<void>;
  findOne(date: string): Promise<IPerformanceRecord | null>;
  findManySince(date: string): Promise<IPerformanceRecord[]>;
  update(record: IPerformanceRecord): Promise<void>;
}
