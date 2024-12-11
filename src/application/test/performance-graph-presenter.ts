import { type Mocked, vi } from "vitest";
import { PerformanceGraphPresenter } from "../performance-graph-presenter.js";
import { PerformanceGraph } from "../performance-graph.js";

export const performanceGraphPresenter: Mocked<PerformanceGraphPresenter> = {
  presentGraph: vi.fn((_: PerformanceGraph | null) => {}),
};
