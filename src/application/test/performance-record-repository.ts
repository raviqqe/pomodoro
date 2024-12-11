import { Mocked, vi } from "vitest";
import { PerformanceRecordRepository } from "../performance-record-repository.js";

export const performanceRecordRepository: Mocked<PerformanceRecordRepository> =
  {
    create: vi.fn(),
    findManySince: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
  };
