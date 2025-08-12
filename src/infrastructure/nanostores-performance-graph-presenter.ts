import { atom } from "nanostores";
import type { PerformanceGraph } from "../application/performance-graph.js";
import type { PerformanceGraphPresenter } from "../application/performance-graph-presenter.js";

export class NanostoresPerformanceGraphPresenter
  implements PerformanceGraphPresenter
{
  public readonly graph = atom<PerformanceGraph | null>(null);

  public presentGraph(graph: PerformanceGraph | null): void {
    this.graph.set(graph);
  }
}
