import { render } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import { Timer } from "./Timer.js";
import { pomodoroTimerPresenter } from "../../main/pomodoro-timer-presenter.js";
import { PomodoroTimerState } from "../../application/pomodoro-timer-state.js";
import { atom } from "nanostores";

beforeEach(() => {
  vi.spyOn(pomodoroTimerPresenter, "seconds", "get").mockReturnValue(atom(42));
});

it("renders while running", () => {
  vi.spyOn(pomodoroTimerPresenter, "stopped", "get").mockReturnValue(
    atom(false),
  );

  expect(render(<Timer />).container.firstChild).toMatchSnapshot();
});

it("renders with pomodoro state", () => {
  expect(render(<Timer />).container.firstChild).toMatchSnapshot();
});

it("renders with short break state", () => {
  vi.spyOn(pomodoroTimerPresenter, "state", "get").mockReturnValue(
    atom(PomodoroTimerState.ShortBreak),
  );

  expect(render(<Timer />).container.firstChild).toMatchSnapshot();
});

it("renders with long break state", () => {
  vi.spyOn(pomodoroTimerPresenter, "state", "get").mockReturnValue(
    atom(PomodoroTimerState.LongBreak),
  );

  expect(render(<Timer />).container.firstChild).toMatchSnapshot();
});
