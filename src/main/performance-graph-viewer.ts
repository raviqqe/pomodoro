import { PerformanceGraphViewer } from "../application/performance-graph-viewer.js";
import { performanceGraphPresenter } from "./performance-graph-presenter.js";
import { performanceRecordRepository } from "./performance-record-repository.js";

export const performanceGraphViewer = new PerformanceGraphViewer(
  performanceRecordRepository,
  performanceGraphPresenter,
);
