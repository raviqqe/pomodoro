import { IPerformanceGraph } from "./performance-graph";

export interface IPerformanceGraphPresenter {
  presentGraph(graph: IPerformanceGraph): void;
}
