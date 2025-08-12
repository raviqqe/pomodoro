import { beforeEach, expect, it } from "vitest";
import { deserializeDate } from "../domain/date-serializer.js";
import { PerformanceGraphViewer } from "./performance-graph-viewer.js";
import { performanceGraphPresenter } from "./test/performance-graph-presenter.js";
import { performanceRecordRepository } from "./test/performance-record-repository.js";

let viewer: PerformanceGraphViewer;

beforeEach(() => {
  viewer = new PerformanceGraphViewer(
    performanceRecordRepository,
    performanceGraphPresenter,
  );
});

it("views a performance graph", async () => {
  performanceRecordRepository.findManySince.mockResolvedValue([
    { date: "20190831", seconds: 0 },
  ]);

  await viewer.viewGraph(deserializeDate("20190831"));

  expect(performanceGraphPresenter.presentGraph.mock.calls).toEqual([
    [{ data: [{ date: "20190831", pomodoros: 0 }] }],
  ]);
});

it("views a performance graph without data", async () => {
  performanceRecordRepository.findManySince.mockResolvedValue([]);

  await viewer.viewGraph(deserializeDate("20190831"));

  expect(performanceGraphPresenter.presentGraph.mock.calls).toEqual([
    [{ data: [] }],
  ]);
});

it("complements data in missing dates", async () => {
  performanceRecordRepository.findManySince.mockResolvedValue([
    { date: "20190831", seconds: 0 },
    { date: "20190902", seconds: 0 },
  ]);

  await viewer.viewGraph(deserializeDate("20190902"));

  expect(performanceGraphPresenter.presentGraph.mock.calls).toEqual([
    [
      {
        data: [
          { date: "20190831", pomodoros: 0 },
          { date: "20190901", pomodoros: 0 },
          { date: "20190902", pomodoros: 0 },
        ],
      },
    ],
  ]);
});
