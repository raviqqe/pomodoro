import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import { PomodoroTimerState } from "../../application/pomodoro-timer-state.js";
import { performanceGraphViewer } from "../../main/performance-graph-viewer.js";
import { Home, type Props } from "./Home.js";

const props: Props = {
  performanceGraph: { data: [] },
  timer: { seconds: 42, state: PomodoroTimerState.Pomodoro, stopped: false },
};

beforeEach(() => {
  vi.spyOn(performanceGraphViewer, "viewGraph").mockResolvedValue();
});

it("renders", () => {
  expect(render(<Home {...props} />).container.firstChild).toMatchSnapshot();
});

it("views a performance graph", async () => {
  const result = await act(async () => render(<Home {...props} />));

  act(() => {
    fireEvent.click(
      result.container.querySelector('[aria-label="View Graph"]')!,
    );
  });

  await waitFor(() =>
    expect(
      result.container.querySelector('[aria-label="View Timer"]'),
    ).toBeTruthy(),
  );

  expect(result.container).toMatchSnapshot();
});

it("goes back to a timer view", async () => {
  const result = await act(async () => render(<Home {...props} />));

  act(() => {
    fireEvent.click(
      result.container.querySelector('[aria-label="View Graph"]')!,
    );
  });

  await waitFor(() =>
    expect(
      result.container.querySelector('[aria-label="View Timer"]'),
    ).toBeTruthy(),
  );

  act(() => {
    fireEvent.click(
      result.container.querySelector('[aria-label="View Timer"]')!,
    );
  });

  await waitFor(() =>
    expect(
      result.container.querySelector('[aria-label="View Graph"]'),
    ).toBeTruthy(),
  );

  expect(result.container).toMatchSnapshot();
});
