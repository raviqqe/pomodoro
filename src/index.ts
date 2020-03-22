import { ApplicationInitializer } from "./application/application-initializer";
import { FirebaseAuthenticationController } from "./infrastructure/firebase/firebase-authentication-controller";
import { FirebaseInitializer } from "./infrastructure/firebase/firebase-initializer";
import { InfrastructureInitializer } from "./infrastructure/infrastructure-initializer";
import { PomodoroTimerPresenter } from "./infrastructure/pomodoro-timer-presenter";
import { AuthenticationPresenter } from "./infrastructure/authentication-presenter";
import { PerformanceTracker } from "./application/performance-tracker";
import { PerformanceGraphViewer } from "./application/performance-graph-viewer";
import { FirestorePerformanceRecordRepository } from "./infrastructure/firebase/firestore-performance-record-repository";
import { PerformanceGraphPresenter } from "./infrastructure/performance-graph-presenter";
import { ReactRenderer } from "./infrastructure/react";
import { SentryErrorReporter } from "./infrastructure/sentry-error-reporter";
import { SignInManager } from "./application/sign-in-manager";
import { SignOutManager } from "./application/sign-out-manager";
import { PomodoroTimer } from "./application/pomodoro-timer";
import { PomodoroTimerStopper } from "./application/pomodoro-timer-stopper";
import { PomodoroTimerStarter } from "./application/pomodoro-timer-starter";
import configuration from "./configuration.json";
import { BuiltinNotificationInitializer } from "./infrastructure/notification/builtin-notification-initializer";
import { BuiltinNotificationPresenter } from "./infrastructure/notification/builtin-notification-presenter";

// Instantiate this at the very beginning to initialize Firebase's default app.
const firebaseInitializer = new FirebaseInitializer(
  configuration.firebase.projectId,
  configuration.firebase.apiKey
);
const errorReporter = new SentryErrorReporter(configuration.sentry.dsn);

async function main() {
  const element = document.getElementById("root");

  if (!element) {
    throw new Error("no root element");
  }

  const authenticationController = new FirebaseAuthenticationController();
  const authenticationPresenter = new AuthenticationPresenter();

  const performanceRecordRepository = new FirestorePerformanceRecordRepository();
  const pomodoroTimerPresenter = new PomodoroTimerPresenter();
  const pomodoroTimer = new PomodoroTimer(
    pomodoroTimerPresenter,
    new BuiltinNotificationPresenter(),
    new PerformanceTracker(performanceRecordRepository)
  );

  const graphPresenter = new PerformanceGraphPresenter();

  new ReactRenderer(
    element,
    [authenticationPresenter, graphPresenter, pomodoroTimerPresenter],
    new ApplicationInitializer(
      new InfrastructureInitializer(
        firebaseInitializer,
        new BuiltinNotificationInitializer()
      ),
      authenticationController,
      authenticationPresenter
    ),
    new PerformanceGraphViewer(performanceRecordRepository, graphPresenter),
    new PomodoroTimerStarter(pomodoroTimer),
    new PomodoroTimerStopper(pomodoroTimer),
    new SignInManager(authenticationController),
    new SignOutManager(authenticationController, authenticationPresenter),
    configuration.repositoryURL
  ).render();

  await navigator.serviceWorker.register("/service-worker.js");
}

main().catch((error) => errorReporter.report(error));
