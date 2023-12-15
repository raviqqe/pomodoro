import { type PerformanceRecord } from "./performance-record.js";

export interface PerformanceRecordRepository {
  create(record: PerformanceRecord): Promise<void>;
  findOne(date: string): Promise<PerformanceRecord | null>;
  findManySince(date: string): Promise<PerformanceRecord[]>;
  update(record: PerformanceRecord): Promise<void>;
}
