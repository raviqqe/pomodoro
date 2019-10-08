import { render } from "@testing-library/react";
import React from "react";
import { App, IProps } from "../App";
import { AuthenticationStore } from "../../mobx/authentication-store";
import { PerformanceGraphStore } from "../../mobx/performance-graph-store";
import { PomodoroTimerStore } from "../../mobx/pomodoro-timer-store";

const commonProps: Omit<
  IProps,
  "authenticationStore" | "performanceGraphStore" | "pomodoroTimerStore"
> = {
  initialize: async () => {},
  repositoryURL: "",
  signIn: async () => {},
  signOut: async () => {},
  startTimer: async () => {},
  stopTimer: async () => {},
  viewGraph: async () => {}
};

it("renders before a user signs in", async () => {
  const result = render(
    <App
      {...commonProps}
      authenticationStore={new AuthenticationStore()}
      performanceGraphStore={new PerformanceGraphStore()}
      pomodoroTimerStore={new PomodoroTimerStore()}
    />
  );

  expect(result.container).toMatchSnapshot();
});

it("renders after a user signs in", async () => {
  const authenticationStore = new AuthenticationStore();

  authenticationStore.setSignedIn(true);

  const result = render(
    <App
      {...commonProps}
      authenticationStore={authenticationStore}
      performanceGraphStore={new PerformanceGraphStore()}
      pomodoroTimerStore={new PomodoroTimerStore()}
    />
  );

  expect(result.container).toMatchSnapshot();
});

it("renders after a user signs out", async () => {
  const authenticationStore = new AuthenticationStore();

  authenticationStore.setSignedIn(false);

  const result = render(
    <App
      {...commonProps}
      authenticationStore={authenticationStore}
      performanceGraphStore={new PerformanceGraphStore()}
      pomodoroTimerStore={new PomodoroTimerStore()}
    />
  );

  expect(result.container).toMatchSnapshot();
});
