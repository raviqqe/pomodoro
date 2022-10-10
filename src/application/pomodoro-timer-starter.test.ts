import { PomodoroTimer } from "../pomodoro-timer";
import { PomodoroTimerStarter } from "../pomodoro-timer-starter";

it("starts a pomodoro timer", () => {
  new PomodoroTimerStarter(
    {
      start: jest.fn(),
    } as unknown as PomodoroTimer,
    { initialize: jest.fn() }
  ).start();
});

it("initializes notifications", () => {
  const notificationInitializer = { initialize: jest.fn() };

  new PomodoroTimerStarter(
    {
      start: jest.fn(),
    } as unknown as PomodoroTimer,
    notificationInitializer
  ).start();

  expect(notificationInitializer.initialize).toHaveBeenCalledTimes(1);
});
