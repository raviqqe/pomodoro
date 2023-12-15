import { type PerformanceGraph } from "./performance-graph.js";

export interface PerformanceGraphPresenter {
  presentGraph(graph: PerformanceGraph): void;
}
