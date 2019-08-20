import { PomodoroTimerStarter } from "../pomodoro-timer-starter";
import { PomodoroTimer } from "../pomodoro-timer";

it("starts a pomodoro timer", async () => {
  await new PomodoroTimerStarter(({
    start: jest.fn()
  } as unknown) as PomodoroTimer).start();
});
