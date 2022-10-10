import { expect, it, vi } from "vitest";
import { PomodoroTimer } from "./pomodoro-timer";
import { PomodoroTimerStarter } from "./pomodoro-timer-starter";

it("starts a pomodoro timer", async () => {
  await new PomodoroTimerStarter(
    {
      start: vi.fn(),
    } as unknown as PomodoroTimer,
    { initialize: vi.fn() }
  ).start();
});

it("initializes notifications", async () => {
  const notificationInitializer = { initialize: vi.fn() };

  await new PomodoroTimerStarter(
    {
      start: vi.fn(),
    } as unknown as PomodoroTimer,
    notificationInitializer
  ).start();

  expect(notificationInitializer.initialize).toHaveBeenCalledTimes(1);
});
