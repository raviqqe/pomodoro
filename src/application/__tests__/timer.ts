import { range } from "lodash";
import { Timer } from "../timer";
import * as utilities from "../../domain/utilities";

it("starts", async () => {
  const spy = jest.spyOn(utilities, "sleep");
  spy.mockResolvedValue(undefined);

  const timerPresenter = {
    presentTime: jest.fn(),
    presentPaused: jest.fn()
  };

  await new Timer(timerPresenter).start(42);

  expect(timerPresenter.presentTime.mock.calls).toEqual(
    range(42, -1, -1).map(seconds => [seconds])
  );
});

it("pauses", async () => {
  const spy = jest.spyOn(utilities, "sleep");
  spy.mockResolvedValue(undefined);

  const timerPresenter = {
    presentTime: jest.fn(),
    presentPaused: jest.fn()
  };

  new Timer(timerPresenter).pause();

  expect(timerPresenter.presentPaused).toBeCalledTimes(1);
});

it("pauses and restarts", async () => {
  const spy = jest.spyOn(utilities, "sleep");
  spy.mockResolvedValue(undefined);

  const timerPresenter = {
    presentTime: jest.fn(),
    presentPaused: jest.fn()
  };

  const timer = new Timer(timerPresenter);
  const promise = timer.start(42);

  timer.pause();
  timer.restart();

  await promise;

  expect(timerPresenter.presentTime.mock.calls).toEqual(
    range(42, -1, -1).map(seconds => [seconds])
  );
});
