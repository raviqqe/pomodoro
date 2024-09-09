import { type PerformanceRecord } from "./performance-record.js";

export interface PerformanceRecordRepository {
  create(record: PerformanceRecord): Promise<void>;
  findManySince(date: string): Promise<PerformanceRecord[]>;
  findOne(date: string): Promise<PerformanceRecord | null>;
  update(record: PerformanceRecord): Promise<void>;
}
