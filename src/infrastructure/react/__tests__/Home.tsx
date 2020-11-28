import { render, fireEvent, waitFor } from "@testing-library/react";
import { create } from "react-test-renderer";
import { PomodoroTimerState } from "../../../application/pomodoro-timer-state";
import { Home, IProps } from "../Home";

const props: IProps = {
  performanceGraph: { data: [] },
  signOut: async () => {},
  startTimer: async () => {},
  stopTimer: async () => {},
  timer: { seconds: 42, state: PomodoroTimerState.Pomodoro, stopped: false },
  viewGraph: async () => {},
};

it("renders", () => {
  expect(create(<Home {...props} />).toJSON()).toMatchSnapshot();
});

it("views a performance graph", async () => {
  const { container } = render(<Home {...props} />);

  fireEvent.click(
    container.querySelector(`[aria-label="View Graph"]`) as Element
  );
  await waitFor(() => container.querySelector(`[aria-label="View Timer"]`));

  expect(container).toMatchSnapshot();
});

it("goes back to a timer view", async () => {
  const { container } = render(<Home {...props} />);

  fireEvent.click(
    container.querySelector(`[aria-label="View Graph"]`) as Element
  );
  await waitFor(() => container.querySelector(`[aria-label="View Timer"]`));

  fireEvent.click(
    container.querySelector(`[aria-label="View Timer"]`) as Element
  );

  expect(container).toMatchSnapshot();
});
