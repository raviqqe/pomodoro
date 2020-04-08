import { IPerformanceGraph } from "../application/performance-graph";
import { IPerformanceGraphPresenter } from "../application/performance-graph-presenter";
import { IRenderer } from "./renderer";

export class PerformanceGraphPresenter implements IPerformanceGraphPresenter {
  private renderer: IRenderer | null = null;

  public setRenderer(renderer: IRenderer): void {
    this.renderer = renderer;
  }

  public presentGraph(graph: IPerformanceGraph): void {
    this.renderer?.renderPerformanceGraph(graph);
  }
}
