import { expect, it, vi } from "vitest";
import { PomodoroTimerStarter } from "./pomodoro-timer-starter.js";
import { type PomodoroTimer } from "./pomodoro-timer.js";

it("starts a pomodoro timer", async () => {
  await new PomodoroTimerStarter(
    {
      start: vi.fn(),
    } as unknown as PomodoroTimer,
    { initialize: vi.fn() },
  ).start();
});

it("initializes notifications", async () => {
  const notificationController = { initialize: vi.fn() };

  await new PomodoroTimerStarter(
    {
      start: vi.fn(),
    } as unknown as PomodoroTimer,
    notificationController,
  ).start();

  expect(notificationController.initialize).toHaveBeenCalledTimes(1);
});
