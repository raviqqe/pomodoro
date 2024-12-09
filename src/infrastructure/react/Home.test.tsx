import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { atom } from "nanostores";
import { beforeEach, expect, it, vi } from "vitest";
import { performanceGraphViewer } from "../../main/performance-graph-viewer.js";
import { pomodoroTimerPresenter } from "../../main/pomodoro-timer-presenter.js";
import { Home } from "./Home.js";

beforeEach(() => {
  vi.spyOn(performanceGraphViewer, "viewGraph").mockResolvedValue();
  vi.spyOn(pomodoroTimerPresenter, "seconds", "get").mockReturnValue(atom(42));
  vi.spyOn(pomodoroTimerPresenter, "stopped", "get").mockReturnValue(
    atom(false),
  );
});

it("renders", () => {
  expect(render(<Home />).container.firstChild).toMatchSnapshot();
});

it("views a performance graph", async () => {
  const result = await act(async () => render(<Home />));

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
  const result = await act(async () => render(<Home />));

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
