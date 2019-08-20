import { range } from "lodash";
import { Timer } from "../timer";
import * as utilities from "../../domain/utilities";
import { ITimerPresenter } from "../timer-presenter";

let timerPresenter: jest.Mocked<ITimerPresenter>;
let timer: Timer;

beforeEach(() => {
  jest.spyOn(utilities, "sleep").mockResolvedValue(undefined);

  timerPresenter = {
    presentTime: jest.fn(),
    presentStopped: jest.fn()
  };
  timer = new Timer(timerPresenter);
});

it("starts", async () => {
  await timer.start(42);

  expect(timerPresenter.presentTime.mock.calls).toEqual(
    range(42, -1, -1).map(seconds => [seconds])
  );
  expect(timerPresenter.presentStopped.mock.calls).toEqual([[false], [true]]);
});

it("stops", async () => {
  const promise = timer.start(42);

  timer.stop();

  await promise;

  expect(timerPresenter.presentTime.mock.calls).toEqual([[42]]);
  expect(timerPresenter.presentStopped.mock.calls).toEqual([[false], [true]]);
});
