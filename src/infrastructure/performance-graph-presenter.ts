import { type IPerformanceGraph } from "../application/performance-graph";
import { type IPerformanceGraphPresenter } from "../application/performance-graph-presenter";
import { type IRenderer } from "./renderer";

export class PerformanceGraphPresenter implements IPerformanceGraphPresenter {
  private renderer: IRenderer | null = null;

  public setRenderer(renderer: IRenderer): void {
    this.renderer = renderer;
  }

  public presentGraph(graph: IPerformanceGraph): void {
    this.renderer?.renderPerformanceGraph(graph);
  }
}
