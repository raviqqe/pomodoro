import { PomodoroTimerStopper } from "../pomodoro-timer-stopper";
import { PomodoroTimer } from "../pomodoro-timer";

it("stops a pomodoro timer", async () => {
  await new PomodoroTimerStopper(({
    stop: jest.fn()
  } as unknown) as PomodoroTimer).stop();
});
