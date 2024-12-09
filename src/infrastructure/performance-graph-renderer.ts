import { atom } from "nanostores";
import { type PerformanceGraphPresenter } from "../application/performance-graph-presenter.js";
import { type PerformanceGraph } from "../application/performance-graph.js";

export class PerformanceGraphRenderer implements PerformanceGraphPresenter {
  public readonly graph = atom<PerformanceGraph | null>(null);

  public presentGraph(graph: PerformanceGraph): void {
    this.graph.set(graph);
  }
}
