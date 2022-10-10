import { DateSerializer } from "../../domain/date-serializer";
import { PerformanceGraph } from "./PerformanceGraph";
import { expect, it } from "vitest";
import { render } from "@testing-library/react";

it("renders with no data", () => {
  expect(
    render(<PerformanceGraph performanceGraph={{ data: [] }} />).container
      .firstChild
  ).toMatchSnapshot();
});

it("renders with data", () => {
  expect(
    render(
      <PerformanceGraph
        performanceGraph={{
          data: [
            { date: DateSerializer.serialize(new Date(0)), pomodoros: 42 },
          ],
        }}
      />
      // TODO
      // { createNodeMock: () => ({ parentElement: document.body }) }
    ).container.firstChild
  ).toMatchSnapshot();
});
