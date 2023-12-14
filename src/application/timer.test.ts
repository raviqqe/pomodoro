import { map, range } from "@raviqqe/loscore";
import { afterEach, beforeEach, it, vi, expect, type Mocked } from "vitest";
import { type TimerPresenter } from "./timer-presenter.js";
import { Timer } from "./timer.js";

const dummyCallbacks = {
  endCallback: async () => {},
  tickCallback: async () => {},
};

let timerPresenter: Mocked<TimerPresenter>;
let timer: Timer;

beforeEach(() => {
  timerPresenter = {
    presentStopped: vi.fn(),
    presentTime: vi.fn(),
  };
  timer = new Timer(timerPresenter);
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
  expect(timerPresenter.presentTime.mock.calls).toEqual([
    ...map(range(42, -1, -1), (seconds) => [seconds]),
  ]);
});
