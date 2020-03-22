import { range } from "lodash";
import { Timer } from "../timer";
import { ITimerPresenter } from "../timer-presenter";

const dummyCallbacks = {
  endCallback: async () => {},
  tickCallback: async () => {},
};

let timerPresenter: jest.Mocked<ITimerPresenter>;
let timer: Timer;

beforeEach(() => {
  timerPresenter = {
    presentStopped: jest.fn(),
    presentTime: jest.fn(),
  };
  timer = new Timer(timerPresenter);
});

afterEach(() => jest.restoreAllMocks());

it("starts", () => {
  timer.start(42, dummyCallbacks);
});

it("stops", () => {
  timer.start(42, dummyCallbacks);
  timer.stop();

  expect(timerPresenter.presentStopped.mock.calls).toEqual([[false], [true]]);
});

it("calls a tick callback", () => {
  const spy = jest.spyOn(window, "setInterval");
  const tickCallback = jest.fn();

  timer.start(42, { ...dummyCallbacks, tickCallback });

  for (const _ of range(43)) {
    (spy.mock.calls[0][0] as any)();
  }

  expect(tickCallback).toBeCalledTimes(42);
});

it("calls an end callback when time is up", () => {
  const spy = jest.spyOn(window, "setInterval");
  const endCallback = jest.fn();

  timer.start(42, { ...dummyCallbacks, endCallback });

  for (const _ of range(43)) {
    (spy.mock.calls[0][0] as any)();
  }

  expect(endCallback).toBeCalledTimes(1);
});

it("presents time", () => {
  const spy = jest.spyOn(window, "setInterval");

  timer.start(42, dummyCallbacks);

  for (const _ of range(43)) {
    (spy.mock.calls[0][0] as any)();
  }

  expect(timerPresenter.presentStopped.mock.calls).toEqual([[false], [true]]);
  expect(timerPresenter.presentTime.mock.calls).toEqual(
    range(42, -1, -1).map((seconds) => [seconds])
  );
});
