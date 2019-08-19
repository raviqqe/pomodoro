import { PomodoroTimerPauser } from "../pomodoro-timer-pauser";
import { PomodoroTimer } from "../pomodoro-timer";

it("pauses a pomodoro timer", async () => {
  await new PomodoroTimerPauser(({
    pause: jest.fn()
  } as unknown) as PomodoroTimer).pause();
});
