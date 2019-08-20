import { range } from "lodash";
import { PomodoroTimer } from "../pomodoro-timer";
import * as utilities from "../../domain/utilities";
import { IPomodoroTimerPresenter } from "../pomodoro-timer-presenter";
import { PomodoroTimerState } from "../pomodoro-timer-state";

let timerPresenter: jest.Mocked<IPomodoroTimerPresenter>;
let pomodoroTimer: PomodoroTimer;

beforeEach(() => {
  jest.spyOn(utilities, "sleep").mockResolvedValue(undefined);

  timerPresenter = {
    presentTime: jest.fn(),
    presentStopped: jest.fn(),
    presentState: jest.fn()
  };
  pomodoroTimer = new PomodoroTimer(timerPresenter);
});

it("starts", async () => {
  await pomodoroTimer.start();
});

it("stops", async () => {
  const promise = pomodoroTimer.start();

  pomodoroTimer.stop();

  await promise;

  expect(timerPresenter.presentTime.mock.calls).toEqual([[25 * 60]]);
});

it("changes its state", async () => {
  for (const _ of range(8)) {
    await pomodoroTimer.start();
  }

  expect(timerPresenter.presentState.mock.calls).toEqual([
    [PomodoroTimerState.ShortBreak],
    [PomodoroTimerState.Pomodoro],
    [PomodoroTimerState.ShortBreak],
    [PomodoroTimerState.Pomodoro],
    [PomodoroTimerState.ShortBreak],
    [PomodoroTimerState.Pomodoro],
    [PomodoroTimerState.LongBreak],
    [PomodoroTimerState.Pomodoro]
  ]);
});
