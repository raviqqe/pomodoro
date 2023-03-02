import { it, vi } from "vitest";
import { PomodoroTimerStopper } from "./pomodoro-timer-stopper.js";
import { type PomodoroTimer } from "./pomodoro-timer.js";

it("stops a pomodoro timer", () => {
  new PomodoroTimerStopper({
    stop: vi.fn(),
  } as unknown as PomodoroTimer).stop();
});
