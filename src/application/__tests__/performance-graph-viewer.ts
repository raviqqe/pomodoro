import { PerformanceGraphViewer } from "../performance-graph-viewer";

it("views a performance graph", async () => {
  const performanceRecordRepository = {
    create: jest.fn(),
    findOne: jest.fn(),
    findManySince: jest.fn(async () => [{ date: "20190831", seconds: 0 }]),
    update: jest.fn()
  };
  const performanceGraphPresenter = { presentGraph: jest.fn() };
  const viewer = new PerformanceGraphViewer(
    performanceRecordRepository,
    performanceGraphPresenter
  );

  await viewer.viewGraph();

  expect(performanceGraphPresenter.presentGraph.mock.calls).toEqual([
    [{ data: [{ date: "20190831", pomodoros: 0 }] }]
  ]);
});
