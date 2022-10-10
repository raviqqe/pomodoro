import { DateSerializer } from "../../domain/date-serializer";
import { IPerformanceGraphPresenter } from "../performance-graph-presenter";
import { PerformanceGraphViewer } from "../performance-graph-viewer";
import { IPerformanceRecordRepository } from "../performance-record-repository";

let performanceRecordRepository: jest.Mocked<IPerformanceRecordRepository>;
let performanceGraphPresenter: jest.Mocked<IPerformanceGraphPresenter>;
let viewer: PerformanceGraphViewer;

beforeEach(() => {
  performanceRecordRepository = {
    create: jest.fn(),
    findManySince: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
  };
  performanceGraphPresenter = { presentGraph: jest.fn() };
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
