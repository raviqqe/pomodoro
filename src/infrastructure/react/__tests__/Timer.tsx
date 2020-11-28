import { create } from "react-test-renderer";
import { PomodoroTimerState } from "../../../application/pomodoro-timer-state";
import { Timer, IProps } from "../Timer";

const commonProps: Omit<IProps, "state" | "stopped"> = {
  seconds: 42,
  startTimer: async () => {},
  stopTimer: async () => {},
};

it("renders while running", () => {
  expect(
    create(
      <Timer
        {...commonProps}
        state={PomodoroTimerState.Pomodoro}
        stopped={false}
      />
    ).toJSON()
  ).toMatchSnapshot();
});

it("renders with pomodoro state", () => {
  expect(
    create(
      <Timer
        {...commonProps}
        state={PomodoroTimerState.Pomodoro}
        stopped={true}
      />
    ).toJSON()
  ).toMatchSnapshot();
});

it("renders with short break state", () => {
  expect(
    create(
      <Timer
        {...commonProps}
        state={PomodoroTimerState.ShortBreak}
        stopped={true}
      />
    ).toJSON()
  ).toMatchSnapshot();
});

it("renders with long break state", () => {
  expect(
    create(
      <Timer
        {...commonProps}
        state={PomodoroTimerState.LongBreak}
        stopped={true}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
