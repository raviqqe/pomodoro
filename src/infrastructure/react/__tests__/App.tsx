import { act, render, waitFor } from "@testing-library/react";
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
  await act(async () => {
    expect(
      render(<App {...props} signedIn={null} />).container
    ).toMatchSnapshot();

    await wait();
  });
});

it("renders after a user signs in", async () => {
  await act(async () => {
    expect(
      render(<App {...props} signedIn={true} />).container
    ).toMatchSnapshot();

    await wait();
  });
});

it("renders after a user signs out", async () => {
  await act(async () => {
    expect(
      render(<App {...props} signedIn={false} />).container
    ).toMatchSnapshot();

    await wait();
  });
});
