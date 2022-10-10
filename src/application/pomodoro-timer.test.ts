import { last, range } from "lodash";
import { INotificationPresenter } from "../notification-presenter";
import { IPerformanceRecordRepository } from "../performance-record-repository";
import { PerformanceTracker } from "../performance-tracker";
import { PomodoroTimer } from "../pomodoro-timer";
import { IPomodoroTimerPresenter } from "../pomodoro-timer-presenter";
import { PomodoroTimerState } from "../pomodoro-timer-state";
import { Timer } from "../timer";

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

it("changes its state", async () => {
  const spy = jest.spyOn(Timer.prototype, "start");

  for (const _ of range(8)) {
    pomodoroTimer.start();
    await last(spy.mock.calls)?.[1].endCallback();
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

it("notifies the end of pomodoros and breaks", async () => {
  const spy = jest.spyOn(Timer.prototype, "start");

  pomodoroTimer.start();
  await last(spy.mock.calls)?.[1].endCallback();
  pomodoroTimer.start();
  await last(spy.mock.calls)?.[1].endCallback();

  expect(notificationPresenter.presentNotification.mock.calls).toEqual([
    ["Pomodoro finished!"],
    ["Break finished!"],
  ]);
});
