import { act, render, RenderResult, waitFor } from "@testing-library/react";
import { PomodoroTimerState } from "../../../application/pomodoro-timer-state";
import { App, IProps } from "../App";

const initialize = jest.fn();

const wait = () => waitFor(() => expect(initialize).toBeCalled());

beforeEach(() => {
  initialize.mockReset().mockResolvedValue(undefined);
});

const props: IProps = {
  initialize,
  performanceGraph: { data: [] },
  repositoryURL: "",
  signIn: async () => {},
  signOut: async () => {},
  signedIn: null,
  startTimer: async () => {},
  stopTimer: async () => {},
  timer: { seconds: 0, state: PomodoroTimerState.Pomodoro, stopped: true },
  viewGraph: async () => {},
};

it("renders before a user signs in", async () => {
  let result: RenderResult | undefined;

  act(() => {
    result = render(<App {...props} signedIn={null} />);
  });

  expect(result?.container).toMatchSnapshot();

  await wait();
});

it("renders after a user signs in", async () => {
  let result: RenderResult | undefined;

  act(() => {
    result = render(<App {...props} signedIn={true} />);
  });

  expect(result?.container).toMatchSnapshot();

  await wait();
});

it("renders after a user signs out", async () => {
  let result: RenderResult | undefined;

  act(() => {
    result = render(<App {...props} signedIn={false} />);
  });

  expect(result?.container).toMatchSnapshot();

  await wait();
});
