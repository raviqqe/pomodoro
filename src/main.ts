import "@fontsource/chelsea-market";
import "@fontsource/roboto";
import configuration from "./configuration.json" with { type: "json" };
import { ReactRenderer } from "./infrastructure/react.js";
import { applicationInitializer } from "./main/application-initializer.js";
import { authenticationPresenter } from "./main/authentication-presenter.js";
import { errorReporter } from "./main/error-reporter.js";
import { performanceGraphPresenter } from "./main/performance-graph-presenter.js";
import { performanceGraphViewer } from "./main/performance-graph-viewer.js";
import { pomodoroTimerPresenter } from "./main/pomodoro-timer-presenter.js";
import { pomodoroTimerStarter } from "./main/pomodoro-timer-starter.js";
import { pomodoroTimerStopper } from "./main/pomodoro-timer-stopper.js";
import { signInManager } from "./main/sign-in-manager.js";
import { signOutManager } from "./main/sign-out-manager.js";

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
    applicationInitializer,
    performanceGraphViewer,
    pomodoroTimerStarter,
    pomodoroTimerStopper,
    signInManager,
    signOutManager,
    configuration.repositoryUrl,
  ).render();
} catch (error) {
  errorReporter.report(error);
}
