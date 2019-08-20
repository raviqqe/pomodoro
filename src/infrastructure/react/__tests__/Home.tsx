import { create } from "react-test-renderer";
import React from "react";
import { Home } from "../Home";
import { PomodoroTimerState } from "../../../application/pomodoro-timer-state";

it("renders", () => {
  expect(
    create(
      <Home
        seconds={42}
        stopped={false}
        state={PomodoroTimerState.Pomodoro}
        signOut={async () => undefined}
        stopTimer={async () => undefined}
        startTimer={async () => undefined}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
