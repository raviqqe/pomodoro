import { render } from "@testing-library/react";
import React from "react";
import { App } from "../App";
import { AuthenticationStore } from "../../mobx/authentication-store";
import { PerformanceGraphStore } from "../../mobx/performance-graph-store";
import { PomodoroTimerStore } from "../../mobx/pomodoro-timer-store";

it("renders before a user signs in", async () => {
  const result = render(
    <App
      authenticationStore={new AuthenticationStore()}
      performanceGraphStore={new PerformanceGraphStore()}
      pomodoroTimerStore={new PomodoroTimerStore()}
      initialize={async () => undefined}
      signIn={async () => undefined}
      signOut={async () => undefined}
      stopTimer={async () => undefined}
      startTimer={async () => undefined}
      repositoryURL="url"
      viewGraph={async () => undefined}
    />
  );

  expect(result.container).toMatchSnapshot();
});

it("renders after a user signs in", async () => {
  const authenticationStore = new AuthenticationStore();

  authenticationStore.setSignedIn(true);

  const result = render(
    <App
      authenticationStore={authenticationStore}
      performanceGraphStore={new PerformanceGraphStore()}
      pomodoroTimerStore={new PomodoroTimerStore()}
      initialize={async () => undefined}
      signIn={async () => undefined}
      signOut={async () => undefined}
      stopTimer={async () => undefined}
      startTimer={async () => undefined}
      repositoryURL="url"
      viewGraph={async () => undefined}
    />
  );

  expect(result.container).toMatchSnapshot();
});

it("renders after a user signs out", async () => {
  const authenticationStore = new AuthenticationStore();

  authenticationStore.setSignedIn(false);

  const result = render(
    <App
      authenticationStore={authenticationStore}
      performanceGraphStore={new PerformanceGraphStore()}
      pomodoroTimerStore={new PomodoroTimerStore()}
      initialize={async () => undefined}
      signIn={async () => undefined}
      signOut={async () => undefined}
      stopTimer={async () => undefined}
      startTimer={async () => undefined}
      repositoryURL="url"
      viewGraph={async () => undefined}
    />
  );

  expect(result.container).toMatchSnapshot();
});
