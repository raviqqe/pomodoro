import { type IPerformanceGraph } from "./performance-graph.js";

export interface IPerformanceGraphPresenter {
  presentGraph(graph: IPerformanceGraph): void;
}
