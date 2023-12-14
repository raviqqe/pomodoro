import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { PomodoroTimerState } from "../../application/pomodoro-timer-state.js";
import { Timer, type Props } from "./Timer.js";

const commonProps: Omit<Props, "state" | "stopped"> = {
  seconds: 42,
  startTimer: async () => {},
  stopTimer: async () => {},
};

it("renders while running", () => {
  expect(
    render(
      <Timer
        {...commonProps}
        state={PomodoroTimerState.Pomodoro}
        stopped={false}
      />,
    ).container.firstChild,
  ).toMatchSnapshot();
});

it("renders with pomodoro state", () => {
  expect(
    render(
      <Timer {...commonProps} state={PomodoroTimerState.Pomodoro} stopped />,
    ).container.firstChild,
  ).toMatchSnapshot();
});

it("renders with short break state", () => {
  expect(
    render(
      <Timer {...commonProps} state={PomodoroTimerState.ShortBreak} stopped />,
    ).container.firstChild,
  ).toMatchSnapshot();
});

it("renders with long break state", () => {
  expect(
    render(
      <Timer {...commonProps} state={PomodoroTimerState.LongBreak} stopped />,
    ).container.firstChild,
  ).toMatchSnapshot();
});
