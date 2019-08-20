import { last, range } from "lodash";
import { PomodoroTimer } from "../pomodoro-timer";
import { Timer } from "../timer";
import { IPomodoroTimerPresenter } from "../pomodoro-timer-presenter";
import { PomodoroTimerState } from "../pomodoro-timer-state";

let timerPresenter: jest.Mocked<IPomodoroTimerPresenter>;
let pomodoroTimer: PomodoroTimer;

beforeEach(() => {
  timerPresenter = {
    presentTime: jest.fn(),
    presentStopped: jest.fn(),
    presentState: jest.fn()
  };
  pomodoroTimer = new PomodoroTimer(timerPresenter);
});

it("starts", () => {
  pomodoroTimer.start();
});

it("stops", () => {
  pomodoroTimer.start();
  pomodoroTimer.stop();

  expect(timerPresenter.presentState.mock.calls).toEqual([
    [PomodoroTimerState.Pomodoro]
  ]);
});

it("changes its state", () => {
  const spy = jest.spyOn(Timer.prototype, "start");

  for (const _ of range(8)) {
    pomodoroTimer.start();
    (last(spy.mock.calls) as any)[1]();
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
