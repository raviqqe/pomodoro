import { type Mocked, expect, it, vi, beforeEach } from "vitest";
import { DateSerializer } from "../domain/date-serializer.js";
import { type IPerformanceGraphPresenter } from "./performance-graph-presenter.js";
import { PerformanceGraphViewer } from "./performance-graph-viewer.js";
import { type IPerformanceRecordRepository } from "./performance-record-repository.js";

let performanceRecordRepository: Mocked<IPerformanceRecordRepository>;
let performanceGraphPresenter: Mocked<IPerformanceGraphPresenter>;
let viewer: PerformanceGraphViewer;

beforeEach(() => {
  performanceRecordRepository = {
    create: vi.fn(),
    findManySince: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
  };
  performanceGraphPresenter = { presentGraph: vi.fn() };
  viewer = new PerformanceGraphViewer(
    performanceRecordRepository,
    performanceGraphPresenter
  );
});

it("views a performance graph", async () => {
  performanceRecordRepository.findManySince.mockResolvedValue([
    { date: "20190831", seconds: 0 },
  ]);

  await viewer.viewGraph(DateSerializer.deserialize("20190831"));

  expect(performanceGraphPresenter.presentGraph.mock.calls).toEqual([
    [{ data: [{ date: "20190831", pomodoros: 0 }] }],
  ]);
});

it("views a performance graph without data", async () => {
  performanceRecordRepository.findManySince.mockResolvedValue([]);

  await viewer.viewGraph(DateSerializer.deserialize("20190831"));

  expect(performanceGraphPresenter.presentGraph.mock.calls).toEqual([
    [{ data: [] }],
  ]);
});

it("complements data in missing dates", async () => {
  performanceRecordRepository.findManySince.mockResolvedValue([
    { date: "20190831", seconds: 0 },
    { date: "20190902", seconds: 0 },
  ]);

  await viewer.viewGraph(DateSerializer.deserialize("20190902"));

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
