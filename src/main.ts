import "@fontsource/chelsea-market";
import "@fontsource/roboto";
import { ReactRenderer } from "./infrastructure/react.js";
import { authenticationPresenter } from "./main/authentication-presenter.js";
import { errorReporter } from "./main/error-reporter.js";
import { performanceGraphPresenter } from "./main/performance-graph-presenter.js";
import { performanceGraphViewer } from "./main/performance-graph-viewer.js";
import { pomodoroTimerPresenter } from "./main/pomodoro-timer-presenter.js";
import { pomodoroTimerStarter } from "./main/pomodoro-timer-starter.js";
import { pomodoroTimerStopper } from "./main/pomodoro-timer-stopper.js";

try {
  const element = document.getElementById("root");

  if (!element) {
    throw new Error("no root element");
  }

  new ReactRenderer(
    element,
    [
      authenticationPresenter,
      performanceGraphPresenter,
      pomodoroTimerPresenter,
    ],
    performanceGraphViewer,
    pomodoroTimerStarter,
    pomodoroTimerStopper,
  ).render();
} catch (error) {
  errorReporter.report(error);
}
