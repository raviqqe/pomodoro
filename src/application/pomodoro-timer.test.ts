import { last, range } from "es-toolkit";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { PerformanceTracker } from "./performance-tracker.js";
import { PomodoroTimerState } from "./pomodoro-timer-state.js";
import { PomodoroTimer } from "./pomodoro-timer.js";
import { notificationPresenter } from "./test/notification-presenter.js";
import { performanceRecordRepository } from "./test/performance-record-repository.js";
import { pomodoroTimerPresenter } from "./test/pomodoro-timer-presenter.js";
import { timerPresenter } from "./test/timer-presenter.js";
import { Timer } from "./timer.js";

let pomodoroTimer: PomodoroTimer;

beforeEach(() => {
  pomodoroTimer = new PomodoroTimer(
    new Timer(
      (callback, interval) => window.setInterval(callback, interval),
      (id) => window.clearInterval(id),
      timerPresenter,
    ),
    pomodoroTimerPresenter,
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

  expect(pomodoroTimerPresenter.presentState.mock.calls).toEqual([
    [PomodoroTimerState.Pomodoro],
  ]);
});

it("changes its state", async () => {
  const spy = vi.spyOn(Timer.prototype, "start");

  for (const _ of range(8)) {
    pomodoroTimer.start();
    await last(spy.mock.calls)?.[1].onEnd();
  }

  expect(pomodoroTimerPresenter.presentState.mock.calls).toEqual([
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
  await last(spy.mock.calls)?.[1].onEnd();
  pomodoroTimer.start();
  await last(spy.mock.calls)?.[1].onEnd();

  expect(notificationPresenter.presentNotification.mock.calls).toEqual([
    ["Pomodoro finished!"],
    ["Break finished!"],
  ]);
});
