import {
  act,
  fireEvent,
  render,
  type RenderResult,
  waitFor,
} from "@testing-library/react";
import { expect, it } from "vitest";
import { PomodoroTimerState } from "../../application/pomodoro-timer-state.js";
import { Home, type Props } from "./Home.js";

const props: Props = {
  performanceGraph: { data: [] },
  timer: { seconds: 42, state: PomodoroTimerState.Pomodoro, stopped: false },
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
      result?.container.querySelector('[aria-label="View Graph"]')!,
    );
  });

  await waitFor(() =>
    expect(
      result?.container.querySelector('[aria-label="View Timer"]'),
    ).toBeTruthy(),
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
      result?.container.querySelector('[aria-label="View Graph"]')!,
    );
  });

  await waitFor(() =>
    expect(
      result?.container.querySelector('[aria-label="View Timer"]'),
    ).toBeTruthy(),
  );

  act(() => {
    fireEvent.click(
      result?.container.querySelector('[aria-label="View Timer"]')!,
    );
  });

  await waitFor(() =>
    expect(
      result?.container.querySelector('[aria-label="View Graph"]'),
    ).toBeTruthy(),
  );

  expect(result?.container).toMatchSnapshot();
});
