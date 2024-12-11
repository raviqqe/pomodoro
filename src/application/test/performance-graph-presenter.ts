import { type Mocked, vi } from "vitest";
import { type PerformanceGraphPresenter } from "../performance-graph-presenter.js";
import { type PerformanceGraph } from "../performance-graph.js";

export const performanceGraphPresenter: Mocked<PerformanceGraphPresenter> = {
  presentGraph: vi.fn((_: PerformanceGraph | null) => {}),
};
