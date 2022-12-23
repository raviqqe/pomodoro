import {
  render,
  fireEvent,
  waitFor,
  RenderResult,
  act,
} from "@testing-library/react";
import { expect, it } from "vitest";
import { PomodoroTimerState } from "../../application/pomodoro-timer-state";
import { Home, IProps } from "./Home";

const props: IProps = {
  performanceGraph: { data: [] },
  signOut: async () => {},
  startTimer: async () => {},
  stopTimer: async () => {},
  timer: { seconds: 42, state: PomodoroTimerState.Pomodoro, stopped: false },
  viewGraph: async () => {},
};

it("renders", () => {
  expect(render(<Home {...props} />).container.firstChild).toMatchSnapshot();
});

it("views a performance graph", async () => {
  let result: RenderResult | undefined;

  act(() => {
    result = render(<Home {...props} />);
  });

  act(() => {
    fireEvent.click(
      result?.container.querySelector(`[aria-label="View Graph"]`) as Element
    );
  });

  await waitFor(() =>
    expect(
      result?.container.querySelector(`[aria-label="View Timer"]`)
    ).toBeTruthy()
  );

  expect(result?.container).toMatchSnapshot();
});

it("goes back to a timer view", async () => {
  let result: RenderResult | undefined;

  act(() => {
    result = render(<Home {...props} />);
  });

  act(() => {
    fireEvent.click(
      result?.container.querySelector(`[aria-label="View Graph"]`) as Element
    );
  });

  await waitFor(() =>
    expect(
      result?.container.querySelector(`[aria-label="View Timer"]`)
    ).toBeTruthy()
  );

  act(() => {
    fireEvent.click(
      result?.container.querySelector(`[aria-label="View Timer"]`) as Element
    );
  });

  await waitFor(() =>
    expect(
      result?.container.querySelector(`[aria-label="View Graph"]`)
    ).toBeTruthy()
  );

  expect(result?.container).toMatchSnapshot();
});
