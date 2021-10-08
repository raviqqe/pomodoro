import { PomodoroTimer } from "../pomodoro-timer";
import { PomodoroTimerStarter } from "../pomodoro-timer-starter";

it("starts a pomodoro timer", () => {
  new PomodoroTimerStarter({
    start: jest.fn(),
  } as unknown as PomodoroTimer).start();
});
