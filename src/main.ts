import { ApplicationInitializer } from "./application/application-initializer.js";
import { PerformanceGraphViewer } from "./application/performance-graph-viewer.js";
import { PerformanceTracker } from "./application/performance-tracker.js";
import { PomodoroTimerStarter } from "./application/pomodoro-timer-starter.js";
import { PomodoroTimerStopper } from "./application/pomodoro-timer-stopper.js";
import { PomodoroTimer } from "./application/pomodoro-timer.js";
import { SignInManager } from "./application/sign-in-manager.js";
import { SignOutManager } from "./application/sign-out-manager.js";
import configuration from "./configuration.json";
import { AuthenticationRenderer } from "./infrastructure/authentication-renderer.js";
import { FirebaseAuthenticationController } from "./infrastructure/firebase/firebase-authentication-controller.js";
import { FirebaseInitializer } from "./infrastructure/firebase/firebase-initializer.js";
import { FirestorePerformanceRecordRepository } from "./infrastructure/firebase/firestore-performance-record-repository.js";
import { BuiltinNotificationController } from "./infrastructure/notification/builtin-notification-controller.js";
import { BuiltinNotificationPresenter } from "./infrastructure/notification/builtin-notification-presenter.js";
import { PerformanceGraphRenderer } from "./infrastructure/performance-graph-renderer.js";
import { PomodoroTimerRenderer } from "./infrastructure/pomodoro-timer-renderer.js";
import { ReactRenderer } from "./infrastructure/react.js";
import { SentryErrorReporter } from "./infrastructure/sentry-error-reporter.js";

// Instantiate this at the very beginning to initialize Firebase's default app.
const firebaseInitializer = new FirebaseInitializer(configuration.firebase);
const errorReporter = new SentryErrorReporter(configuration.sentry.dsn);

const main = () => {
  const element = document.getElementById("root");

  if (!element) {
    throw new Error("no root element");
  }

  const firebaseApp = firebaseInitializer.initialize();
  const authenticationController = new FirebaseAuthenticationController(
    firebaseApp,
  );
  const authenticationPresenter = new AuthenticationRenderer();

  const performanceRecordRepository = new FirestorePerformanceRecordRepository(
    firebaseApp,
  );
  const pomodoroTimerPresenter = new PomodoroTimerRenderer();
  const pomodoroTimer = new PomodoroTimer(
    pomodoroTimerPresenter,
    new BuiltinNotificationPresenter(),
    new PerformanceTracker(performanceRecordRepository),
  );

  const graphPresenter = new PerformanceGraphRenderer();

  new ReactRenderer(
    element,
    [authenticationPresenter, graphPresenter, pomodoroTimerPresenter],
    new ApplicationInitializer(
      authenticationController,
      authenticationPresenter,
    ),
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
};

try {
  main();
} catch (error) {
  errorReporter.report(error);
}
