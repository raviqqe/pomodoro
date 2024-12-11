import { range } from "es-toolkit";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { Timer } from "./timer.js";
import { timerPresenter } from "./test/timer-presenter.js";

const dummyCallbacks = {
  endCallback: async () => {},
  tickCallback: async () => {},
};

let timer: Timer;

beforeEach(() => {
  timer = new Timer(
    (callback, interval) => window.setInterval(callback, interval),
    (id) => window.clearInterval(id),
    timerPresenter,
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

it("starts", () => {
  timer.start(42, dummyCallbacks);
});

it("stops", () => {
  timer.start(42, dummyCallbacks);
  timer.stop();

  expect(timerPresenter.presentStopped.mock.calls).toEqual([[false], [true]]);
});

it("calls a tick callback", () => {
  const spy = vi.spyOn(window, "setInterval");
  const tickCallback = vi.fn();

  timer.start(42, { ...dummyCallbacks, tickCallback });

  for (const _ of range(43)) {
    (spy.mock.calls[0]?.[0] as () => void)();
  }

  expect(tickCallback).toHaveBeenCalledTimes(42);
});

it("calls an end callback when time is up", () => {
  const spy = vi.spyOn(window, "setInterval");
  const endCallback = vi.fn();

  timer.start(42, { ...dummyCallbacks, endCallback });

  for (const _ of range(43)) {
    (spy.mock.calls[0]?.[0] as () => void)();
  }

  expect(endCallback).toHaveBeenCalledTimes(1);
});

it("presents time", () => {
  const spy = vi.spyOn(window, "setInterval");

  timer.start(42, dummyCallbacks);

  for (const _ of range(43)) {
    (spy.mock.calls[0]?.[0] as () => void)();
  }

  expect(timerPresenter.presentStopped.mock.calls).toEqual([[false], [true]]);
  expect(timerPresenter.presentTime.mock.calls).toEqual(
    range(42, -1, -1).map((seconds) => [seconds]),
  );
});
