import { type PerformanceGraphPresenter } from "../application/performance-graph-presenter.js";
import { type PerformanceGraph } from "../application/performance-graph.js";
import { type Renderer } from "./renderer.js";

export class PerformanceGraphPresenter implements PerformanceGraphPresenter {
  private renderer: Renderer | null = null;

  public setRenderer(renderer: Renderer): void {
    this.renderer = renderer;
  }

  public presentGraph(graph: PerformanceGraph): void {
    this.renderer?.renderPerformanceGraph(graph);
  }
}
