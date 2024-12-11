import { PerformanceTracker } from "../application/performance-tracker.js";
import { performanceRecordRepository } from "../main/performance-record-repository.js";

export const performanceTracker = new PerformanceTracker(
  performanceRecordRepository,
);
