import { PomodoroTimerRestarter } from "../pomodoro-timer-restarter";
import { PomodoroTimer } from "../pomodoro-timer";

it("restarts a pomodoro timer", async () => {
  await new PomodoroTimerRestarter(({
    restart: jest.fn()
  } as unknown) as PomodoroTimer).restart();
});
