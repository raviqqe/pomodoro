import "@fontsource/chelsea-market";
import "@fontsource/roboto";
import { ReactRenderer } from "./infrastructure/react.js";
import { authenticationPresenter } from "./main/authentication-presenter.js";
import { errorReporter } from "./main/error-reporter.js";
import { performanceGraphPresenter } from "./main/performance-graph-presenter.js";
import { pomodoroTimerPresenter } from "./main/pomodoro-timer-presenter.js";

try {
  const element = document.getElementById("root");

  if (!element) {
    throw new Error("no root element");
  }

  new ReactRenderer(element, [
    authenticationPresenter,
    performanceGraphPresenter,
    pomodoroTimerPresenter,
  ]).render();
} catch (error) {
  errorReporter.report(error);
}
