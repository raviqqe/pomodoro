import { PomodoroTimer } from "./pomodoro-timer";
import { PomodoroTimerStarter } from "./pomodoro-timer-starter";
import { expect, it, vi } from "vitest";

it("starts a pomodoro timer", () => {
  new PomodoroTimerStarter(
    {
      start: vi.fn(),
    } as unknown as PomodoroTimer,
    { initialize: vi.fn() }
  ).start();
});

it("initializes notifications", () => {
  const notificationInitializer = { initialize: vi.fn() };

  new PomodoroTimerStarter(
    {
      start: vi.fn(),
    } as unknown as PomodoroTimer,
    notificationInitializer
  ).start();

  expect(notificationInitializer.initialize).toHaveBeenCalledTimes(1);
});
