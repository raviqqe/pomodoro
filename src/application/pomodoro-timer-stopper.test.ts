import { it, vi } from "vitest";
import { type PomodoroTimer } from "./pomodoro-timer";
import { PomodoroTimerStopper } from "./pomodoro-timer-stopper";

it("stops a pomodoro timer", () => {
  new PomodoroTimerStopper({
    stop: vi.fn(),
  } as unknown as PomodoroTimer).stop();
});
