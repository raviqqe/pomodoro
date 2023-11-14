import { last, range } from "@raviqqe/loscore";
import { afterEach, vi, type Mocked, beforeEach, expect, it } from "vitest";
import { type INotificationPresenter } from "./notification-presenter.js";
import { type IPerformanceRecordRepository } from "./performance-record-repository.js";
import { PerformanceTracker } from "./performance-tracker.js";
import { type IPomodoroTimerPresenter } from "./pomodoro-timer-presenter.js";
import { PomodoroTimerState } from "./pomodoro-timer-state.js";
import { PomodoroTimer } from "./pomodoro-timer.js";
import { Timer } from "./timer.js";

let timerPresenter: Mocked<IPomodoroTimerPresenter>;
let notificationPresenter: Mocked<INotificationPresenter>;
let performanceRecordRepository: Mocked<IPerformanceRecordRepository>;
let pomodoroTimer: PomodoroTimer;

beforeEach(() => {
  timerPresenter = {
    presentState: vi.fn(),
    presentStopped: vi.fn(),
    presentTime: vi.fn(),
  };
  notificationPresenter = { presentNotification: vi.fn() };
  performanceRecordRepository = {
    create: vi.fn(),
    findManySince: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
  };

  pomodoroTimer = new PomodoroTimer(
    timerPresenter,
    notificationPresenter,
    new PerformanceTracker(performanceRecordRepository),
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

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
  const spy = vi.spyOn(Timer.prototype, "start");

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
  const spy = vi.spyOn(Timer.prototype, "start");

  pomodoroTimer.start();
  await last(spy.mock.calls)?.[1].endCallback();
  pomodoroTimer.start();
  await last(spy.mock.calls)?.[1].endCallback();

  expect(notificationPresenter.presentNotification.mock.calls).toEqual([
    ["Pomodoro finished!"],
    ["Break finished!"],
  ]);
});
