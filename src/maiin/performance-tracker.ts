import { PerformanceTracker } from "../application/performance-tracker.js";
import { performanceRecordRepository } from "../main/performance0-record-repository.js";

export const performanceTracker = new PerformanceTracker(
  performanceRecordRepository,
);
