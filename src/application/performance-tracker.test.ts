import { range } from "lodash";
import { vi, beforeEach, it, expect, Mocked } from "vitest";
import { IPerformanceRecordRepository } from "./performance-record-repository";
import { PerformanceTracker } from "./performance-tracker";

let performanceRecordRepository: Mocked<IPerformanceRecordRepository>;
let tracker: PerformanceTracker;

beforeEach(() => {
  performanceRecordRepository = {
    create: vi.fn(),
    findManySince: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
  };
  tracker = new PerformanceTracker(performanceRecordRepository);
});

it("tracks performance by a minute", async () => {
  await tracker.addSecond();

  expect(performanceRecordRepository.create.mock.calls).toEqual([]);

  for (const _ of range(59)) {
    await tracker.addSecond();
  }

  expect(performanceRecordRepository.create.mock.calls).toEqual([
    [
      expect.objectContaining({
        date: expect.any(String) as string,
        seconds: 60,
      }),
    ],
  ]);
});

it("updates an existing performance record", async () => {
  performanceRecordRepository.findOne.mockImplementationOnce(async () => null);
  performanceRecordRepository.findOne.mockImplementationOnce(async (date) => ({
    date,
    seconds: 60,
  }));

  for (const _ of range(120)) {
    await tracker.addSecond();
  }

  expect(performanceRecordRepository.create.mock.calls).toEqual([
    [
      expect.objectContaining({
        date: expect.any(String) as string,
        seconds: 60,
      }),
    ],
  ]);
  expect(performanceRecordRepository.update.mock.calls).toEqual([
    [
      expect.objectContaining({
        date: expect.any(String) as string,
        seconds: 120,
      }),
    ],
  ]);
});
