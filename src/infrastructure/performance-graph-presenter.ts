import { type IPerformanceGraph } from "../application/performance-graph.js";
import { type IPerformanceGraphPresenter } from "../application/performance-graph-presenter.js";
import { type IRenderer } from "./renderer.js";

export class PerformanceGraphPresenter implements IPerformanceGraphPresenter {
  private renderer: IRenderer | null = null;

  public setRenderer(renderer: IRenderer): void {
    this.renderer = renderer;
  }

  public presentGraph(graph: IPerformanceGraph): void {
    this.renderer?.renderPerformanceGraph(graph);
  }
}
