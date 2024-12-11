import { type Mocked, vi } from "vitest";
import { type PomodoroTimerPresenter } from "../pomodoro-timer-presenter.js";

export const pomodoroTimerPresenter: Mocked<PomodoroTimerPresenter> = {
  presentState: vi.fn(),
};
