import {
  act,
  render,
  type RenderResult,
  waitFor,
} from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import { PomodoroTimerState } from "../../application/pomodoro-timer-state.js";
import { applicationInitializer } from "../../main/application-initializer.js";
import { App, type Props } from "./App.js";

let wait = async () => {};

beforeEach(() => {
  const initialize = vi
    .spyOn(applicationInitializer, "initialize")
    .mockResolvedValue(undefined);
  wait = () => waitFor(() => expect(initialize).toHaveBeenCalled());
});

const props: Props = {
  performanceGraph: { data: [] },
  signedIn: null,
  timer: { seconds: 0, state: PomodoroTimerState.Pomodoro, stopped: true },
};

it("renders before a user signs in", async () => {
  const result = await act(async () => {
    return render(<App {...props} signedIn={null} />);
  });

  expect(result.container).toMatchSnapshot();

  await wait();
});

it("renders after a user signs in", async () => {
  const result = await act(async () => {
    return render(<App {...props} signedIn />);
  });

  expect(result.container).toMatchSnapshot();

  await wait();
});

it("renders after a user signs out", async () => {
  const result = await act(async () => {
    return render(<App {...props} signedIn={false} />);
  });

  expect(result.container).toMatchSnapshot();

  await wait();
});
