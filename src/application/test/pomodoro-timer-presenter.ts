import { Mocked, vi } from "vitest";
import { PomodoroTimerPresenter } from "../pomodoro-timer-presenter.js";

export const pomodoroTimerPresenter: Mocked<PomodoroTimerPresenter> = {
  presentState: vi.fn(),
};
