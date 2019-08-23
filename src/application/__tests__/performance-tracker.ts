import { range } from "lodash";
import { PerformanceTracker } from "../performance-tracker";

it("tracks performance by a minute", async () => {
  const performanceRecordRepository = {
    create: jest.fn(),
    findOne: jest.fn(),
    findManySince: jest.fn(),
    update: jest.fn()
  };
  const tracker = new PerformanceTracker(performanceRecordRepository);

  await tracker.addSecond();

  expect(performanceRecordRepository.create.mock.calls).toEqual([]);

  for (const _ of range(59)) {
    await tracker.addSecond();
  }

  expect(performanceRecordRepository.create.mock.calls).toEqual([
    [expect.objectContaining({ date: expect.any(String), seconds: 60 })]
  ]);
});
