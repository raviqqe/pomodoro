import { create } from "react-test-renderer";
import React from "react";
import { Home } from "../Home";
import { PomodoroTimerState } from "../../../application/pomodoro-timer-state";

it("renders", () => {
  expect(
    create(
      <Home
        performanceGraph={{ data: [] }}
        seconds={42}
        signOut={async () => {}}
        startTimer={async () => {}}
        state={PomodoroTimerState.Pomodoro}
        stopTimer={async () => {}}
        stopped={false}
        viewGraph={async () => {}}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
