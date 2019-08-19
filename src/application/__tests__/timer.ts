import { range } from "lodash";
import { Timer } from "../timer";
import * as utilities from "../../domain/utilities";

it("starts", async () => {
  const spy = jest.spyOn(utilities, "sleep");
  spy.mockResolvedValue(undefined);

  const timerPresenter = {
    presentTime: jest.fn(),
    presentStopped: jest.fn()
  };

  await new Timer(timerPresenter).start(42);

  expect(timerPresenter.presentTime.mock.calls).toEqual(
    range(42, -1, -1).map(seconds => [seconds])
  );
  expect(timerPresenter.presentStopped.mock.calls).toEqual([[false], [true]]);
});

it("stops", async () => {
  const spy = jest.spyOn(utilities, "sleep");
  spy.mockResolvedValue(undefined);

  const timerPresenter = {
    presentTime: jest.fn(),
    presentStopped: jest.fn()
  };

  const timer = new Timer(timerPresenter);
  const promise = timer.start(42);

  timer.stop();

  await promise;

  expect(timerPresenter.presentTime.mock.calls).toEqual([[42]]);
  expect(timerPresenter.presentStopped.mock.calls).toEqual([[false], [true]]);
});
