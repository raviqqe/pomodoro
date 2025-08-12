import { type Mocked, vi } from "vitest";
import type { TimerPresenter } from "../timer-presenter.js";

export const timerPresenter: Mocked<TimerPresenter> = {
  presentStopped: vi.fn(),
  presentTime: vi.fn(),
};
