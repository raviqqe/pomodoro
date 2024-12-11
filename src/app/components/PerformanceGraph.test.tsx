import { render } from "@testing-library/react";
import { atom } from "nanostores";
import { expect, it, vi } from "vitest";
import { DateSerializer } from "../../domain/date-serializer.js";
import { performanceGraphPresenter } from "../../main/performance-graph-presenter.js";
import { PerformanceGraph } from "./PerformanceGraph.js";

it("renders with no data", () => {
  expect(render(<PerformanceGraph />).container.firstChild).toMatchSnapshot();
});

it("renders with data", () => {
  vi.spyOn(performanceGraphPresenter, "graph", "get").mockReturnValue(
    atom({
      data: [{ date: DateSerializer.serialize(new Date(0)), pomodoros: 42 }],
    }),
  );

  expect(render(<PerformanceGraph />).container.firstChild).toMatchSnapshot();
});
