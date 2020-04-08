import { PomodoroTimer } from "../pomodoro-timer";
import { PomodoroTimerStopper } from "../pomodoro-timer-stopper";

it("stops a pomodoro timer", async () => {
  await new PomodoroTimerStopper(({
    stop: jest.fn(),
  } as unknown) as PomodoroTimer).stop();
});
