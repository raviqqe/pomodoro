import { range } from "es-toolkit";
import { beforeEach, expect, it } from "vitest";
import { PerformanceTracker } from "./performance-tracker.js";
import { performanceRecordRepository } from "./test/performance-record-repository.js";

let tracker: PerformanceTracker;

beforeEach(() => {
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
