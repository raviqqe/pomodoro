import { render } from "@testing-library/react";
import React from "react";
import { PomodoroTimerState } from "../../../application/pomodoro-timer-state";
import { App, IProps } from "../App";

const props: IProps = {
  initialize: async () => {},
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
  expect(
    render(<App {...props} signedIn={null} />).container
  ).toMatchSnapshot();
});

it("renders after a user signs in", async () => {
  expect(
    render(<App {...props} signedIn={true} />).container
  ).toMatchSnapshot();
});

it("renders after a user signs out", async () => {
  expect(
    render(<App {...props} signedIn={false} />).container
  ).toMatchSnapshot();
});
