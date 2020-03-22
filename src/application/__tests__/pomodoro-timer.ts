import { last, range } from "lodash";
import { PomodoroTimer } from "../pomodoro-timer";
import { Timer } from "../timer";
import { IPomodoroTimerPresenter } from "../pomodoro-timer-presenter";
import { INotificationPresenter } from "../notification-presenter";
import { PomodoroTimerState } from "../pomodoro-timer-state";
import { PerformanceTracker } from "../performance-tracker";
import { IPerformanceRecordRepository } from "../performance-record-repository";

let timerPresenter: jest.Mocked<IPomodoroTimerPresenter>;
let notificationPresenter: jest.Mocked<INotificationPresenter>;
let performanceRecordRepository: jest.Mocked<IPerformanceRecordRepository>;
let pomodoroTimer: PomodoroTimer;

beforeEach(() => {
  timerPresenter = {
    presentState: jest.fn(),
    presentStopped: jest.fn(),
    presentTime: jest.fn(),
  };
  notificationPresenter = { presentNotification: jest.fn() };
  performanceRecordRepository = {
    create: jest.fn(),
    findManySince: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
  };

  pomodoroTimer = new PomodoroTimer(
    timerPresenter,
    notificationPresenter,
    new PerformanceTracker(performanceRecordRepository)
  );
});

afterEach(() => jest.restoreAllMocks());

it("starts", () => {
  pomodoroTimer.start();
});

it("stops", () => {
  pomodoroTimer.start();
  pomodoroTimer.stop();

  expect(timerPresenter.presentState.mock.calls).toEqual([
    [PomodoroTimerState.Pomodoro],
  ]);
});

it("changes its state", () => {
  const spy = jest.spyOn(Timer.prototype, "start");

  for (const _ of range(8)) {
    pomodoroTimer.start();
    (last(spy.mock.calls) as any)[1].endCallback();
  }

  expect(timerPresenter.presentState.mock.calls).toEqual([
    [PomodoroTimerState.ShortBreak],
    [PomodoroTimerState.Pomodoro],
    [PomodoroTimerState.ShortBreak],
    [PomodoroTimerState.Pomodoro],
    [PomodoroTimerState.ShortBreak],
    [PomodoroTimerState.Pomodoro],
    [PomodoroTimerState.LongBreak],
    [PomodoroTimerState.Pomodoro],
  ]);
});

it("notifies the end of pomodoros and breaks", () => {
  const spy = jest.spyOn(Timer.prototype, "start");

  pomodoroTimer.start();
  (last(spy.mock.calls) as any)[1].endCallback();
  pomodoroTimer.start();
  (last(spy.mock.calls) as any)[1].endCallback();

  expect(notificationPresenter.presentNotification.mock.calls).toEqual([
    ["Pomodoro finished!"],
    ["Break finished!"],
  ]);
});
