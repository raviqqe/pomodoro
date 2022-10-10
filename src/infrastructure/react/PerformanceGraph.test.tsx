import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { DateSerializer } from "../../domain/date-serializer";
import { PerformanceGraph } from "./PerformanceGraph";

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
    ).container.firstChild
  ).toMatchSnapshot();
});
