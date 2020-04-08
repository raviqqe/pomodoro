import React from "react";
import { create } from "react-test-renderer";
import { DateSerializer } from "../../../domain/date-serializer";
import { PerformanceGraph } from "../PerformanceGraph";

it("renders with no data", () => {
  expect(
    create(<PerformanceGraph performanceGraph={{ data: [] }} />).toJSON()
  ).toMatchSnapshot();
});

it("renders with data", () => {
  expect(
    create(
      <PerformanceGraph
        performanceGraph={{
          data: [
            { date: DateSerializer.serialize(new Date(0)), pomodoros: 42 },
          ],
        }}
      />,
      { createNodeMock: () => ({ parentElement: document.body }) }
    ).toJSON()
  ).toMatchSnapshot();
});
