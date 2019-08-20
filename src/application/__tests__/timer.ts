import { range } from "lodash";
import { Timer } from "../timer";
import { ITimerPresenter } from "../timer-presenter";

let timerPresenter: jest.Mocked<ITimerPresenter>;
let timer: Timer;

beforeEach(() => {
  timerPresenter = {
    presentTime: jest.fn(),
    presentStopped: jest.fn()
  };
  timer = new Timer(timerPresenter);
});

afterEach(() => jest.restoreAllMocks());

it("starts", () => {
  timer.start(42, () => undefined);
});

it("stops", () => {
  timer.start(42, () => undefined);
  timer.stop();

  expect(timerPresenter.presentStopped.mock.calls).toEqual([[false], [true]]);
});

it("calls a callback when time is up", () => {
  const spy = jest.spyOn(window, "setInterval");
  const callback = jest.fn();

  timer.start(42, callback);

  for (const _ of range(43)) {
    (spy.mock.calls[0][0] as any)();
  }

  expect(callback).toBeCalledTimes(1);
});

it("presents time", () => {
  const spy = jest.spyOn(window, "setInterval");

  timer.start(42, () => undefined);

  for (const _ of range(43)) {
    (spy.mock.calls[0][0] as any)();
  }

  expect(timerPresenter.presentStopped.mock.calls).toEqual([[false], [true]]);
  expect(timerPresenter.presentTime.mock.calls).toEqual(
    range(42, -1, -1).map(seconds => [seconds])
  );
});
