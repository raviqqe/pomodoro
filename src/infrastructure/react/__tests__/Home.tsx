import { create } from "react-test-renderer";
import React from "react";
import { render, fireEvent, waitForDomChange } from "@testing-library/react";
import { Home, IProps } from "../Home";
import { PomodoroTimerState } from "../../../application/pomodoro-timer-state";

const props: IProps = {
  performanceGraph: { data: [] },
  seconds: 42,
  signOut: async () => {},
  startTimer: async () => {},
  state: PomodoroTimerState.Pomodoro,
  stopTimer: async () => {},
  stopped: false,
  viewGraph: async () => {}
};

it("renders", () => {
  expect(create(<Home {...props} />).toJSON()).toMatchSnapshot();
});

it("views a performance graph", async () => {
  const { container } = render(<Home {...props} />);

  fireEvent.click(container.querySelector(
    `[aria-label="View Graph"]`
  ) as Element);
  await waitForDomChange();

  expect(container).toMatchSnapshot();
});

it("goes back to a timer view", async () => {
  const { container } = render(<Home {...props} />);

  fireEvent.click(container.querySelector(
    `[aria-label="View Graph"]`
  ) as Element);
  await waitForDomChange();

  fireEvent.click(container.querySelector(
    `[aria-label="View Timer"]`
  ) as Element);

  expect(container).toMatchSnapshot();
});
