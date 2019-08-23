import { action, observable } from "mobx";
import { IPerformanceGraph } from "../../application/performance-graph";

export class PerformanceGraphStore {
  @observable public performanceGraph: IPerformanceGraph = { points: [] };

  @action
  public setPerformanceGraph(graph: IPerformanceGraph): void {
    this.performanceGraph = graph;
  }
}
