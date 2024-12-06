import "@fontsource/chelsea-market";
import "@fontsource/roboto";
import { PerformanceGraphViewer } from "./application/performance-graph-viewer.js";
import { PerformanceTracker } from "./application/performance-tracker.js";
import { PomodoroTimerStarter } from "./application/pomodoro-timer-starter.js";
import { PomodoroTimerStopper } from "./application/pomodoro-timer-stopper.js";
import { PomodoroTimer } from "./application/pomodoro-timer.js";
import { SignInManager } from "./application/sign-in-manager.js";
import { SignOutManager } from "./application/sign-out-manager.js";
import configuration from "./configuration.json" with { type: "json" };
import { BuiltinNotificationController } from "./infrastructure/notification/builtin-notification-controller.js";
import { BuiltinNotificationPresenter } from "./infrastructure/notification/builtin-notification-presenter.js";
import { PerformanceGraphRenderer } from "./infrastructure/performance-graph-renderer.js";
import { ReactRenderer } from "./infrastructure/react.js";
import { errorReporter } from "./main/error-reporter.js";
import { authenticationPresenter } from "./main/authentication-presenter.js";
import { authenticationController } from "./main/authentication-controller.js";
import { applicationInitializer } from "./main/application-initializer.js";
import { pomodoroTimerPresenter } from "./main/pomodoro-timer-presenter.js";
import { performanceRecordRepository } from "./main/performance0-record-repository.js";

try {
  const pomodoroTimer = new PomodoroTimer(
    pomodoroTimerPresenter,
    new BuiltinNotificationPresenter(),
    new PerformanceTracker(performanceRecordRepository),
  );

  const graphPresenter = new PerformanceGraphRenderer();

  const element = document.getElementById("root");

  if (!element) {
    throw new Error("no root element");
  }

  new ReactRenderer(
    element,
    [authenticationPresenter, graphPresenter, pomodoroTimerPresenter],
    applicationInitializer,
    new PerformanceGraphViewer(performanceRecordRepository, graphPresenter),
    new PomodoroTimerStarter(
      pomodoroTimer,
      new BuiltinNotificationController(),
    ),
    new PomodoroTimerStopper(pomodoroTimer),
    new SignInManager(authenticationController, authenticationPresenter),
    new SignOutManager(authenticationController, authenticationPresenter),
    configuration.repositoryUrl,
  ).render();
} catch (error) {
  errorReporter.report(error);
}
