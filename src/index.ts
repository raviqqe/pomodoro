import { ApplicationInitializer } from "./application/application-initializer";
import { FirebaseAuthenticationController } from "./infrastructure/firebase/firebase-authentication-controller";
import { FirebaseInitializer } from "./infrastructure/firebase/firebase-initializer";
import { InfrastructureInitializer } from "./infrastructure/infrastructure-initializer";
import { PomodoroTimerStore } from "./infrastructure/mobx/pomodoro-timer-store";
import { MobxPomodoroTimerPresenter } from "./infrastructure/mobx/mobx-pomodoro-timer-presenter";
import { AuthenticationStore } from "./infrastructure/mobx/authentication-store";
import { MobxAuthenticationPresenter } from "./infrastructure/mobx/mobx-authentication-presenter";
import { ReactRenderer } from "./infrastructure/react";
import { SentryErrorReporter } from "./infrastructure/sentry-error-reporter";
import { SignInManager } from "./application/sign-in-manager";
import { SignOutManager } from "./application/sign-out-manager";
import { PomodoroTimer } from "./application/pomodoro-timer";
import { PomodoroTimerStopper } from "./application/pomodoro-timer-stopper";
import { PomodoroTimerStarter } from "./application/pomodoro-timer-starter";
import configuration from "./configuration.json";

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

  const authenticationStore = new AuthenticationStore();
  const authenticationController = new FirebaseAuthenticationController();
  const authenticationPresenter = new MobxAuthenticationPresenter(
    authenticationStore
  );

  const pomodoroTimerStore = new PomodoroTimerStore();
  const pomodoroTimerPresenter = new MobxPomodoroTimerPresenter(
    pomodoroTimerStore
  );
  const pomodoroTimer = new PomodoroTimer(pomodoroTimerPresenter);

  new ReactRenderer(
    new ApplicationInitializer(
      new InfrastructureInitializer(firebaseInitializer),
      authenticationController,
      authenticationPresenter
    ),
    new PomodoroTimerStarter(pomodoroTimer),
    new PomodoroTimerStopper(pomodoroTimer),
    new SignInManager(authenticationController, authenticationPresenter),
    new SignOutManager(authenticationController, authenticationPresenter),
    authenticationStore,
    pomodoroTimerStore,
    configuration.repositoryURL
  ).render(element);

  // Disable default behavior on drop events.
  window.ondragover = event => event.preventDefault();
  window.ondrop = event => event.preventDefault();

  await navigator.serviceWorker.register("/service-worker.js");
}

main().catch(error => errorReporter.report(error));
