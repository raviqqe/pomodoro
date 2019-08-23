import { render } from "@testing-library/react";
import React from "react";
import { PerformanceGraph } from "../PerformanceGraph";
import { DateSerializer } from "../../../domain/date-serializer";

it("renders with no data", () => {
  const result = render(
    <div>
      <PerformanceGraph performanceGraph={{ points: [] }} />
    </div>
  );
  expect(result.container).toMatchSnapshot();
});

it("renders with data", () => {
  const result = render(
    <div>
      <PerformanceGraph
        performanceGraph={{
          points: [
            { date: DateSerializer.serialize(new Date(0)), pomodoros: 42 }
          ]
        }}
      />
    </div>
  );
  expect(result.container).toMatchSnapshot();
});
