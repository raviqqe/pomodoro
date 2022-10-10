import { it, vi } from "vitest";
import { PomodoroTimer } from "./pomodoro-timer";
import { PomodoroTimerStopper } from "./pomodoro-timer-stopper";

it("stops a pomodoro timer", () => {
  new PomodoroTimerStopper({
    stop: vi.fn(),
  } as unknown as PomodoroTimer).stop();
});
