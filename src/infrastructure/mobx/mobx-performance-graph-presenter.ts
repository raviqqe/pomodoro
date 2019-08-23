import { IPerformanceGraphPresenter } from "../../application/performance-graph-presenter";
import { IPerformanceGraph } from "../../application/performance-graph";
import { PerformanceGraphStore } from "./performance-graph-store";

export class MobxPerformanceGraphPresenter
  implements IPerformanceGraphPresenter {
  constructor(private readonly store: PerformanceGraphStore) {}

  public presentGraph(graph: IPerformanceGraph): void {
    this.store.setPerformanceGraph(graph);
  }
}
