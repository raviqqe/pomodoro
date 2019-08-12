import { ApplicationInitializer } from "./application/application-initializer";
import { FirebaseAuthenticationController } from "./infrastructure/firebase/firebase-authentication-controller";
import { FirebaseInitializer } from "./infrastructure/firebase/firebase-initializer";
import { InfrastructureInitializer } from "./infrastructure/infrastructure-initializer";
import { ReactRenderer } from "./infrastructure/react";
import { SentryErrorReporter } from "./infrastructure/sentry-error-reporter";
import { SignInManager } from "./application/sign-in-manager";
import { SignOutManager } from "./application/sign-out-manager";
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

  const authenticationController = new FirebaseAuthenticationController();

  new ReactRenderer(
    new ApplicationInitializer(
      new InfrastructureInitializer(firebaseInitializer),
      authenticationController
    ),
    new SignInManager(authenticationController),
    new SignOutManager(authenticationController),
    configuration.repositoryURL
  ).render(element);

  // Disable default behavior on drop events.
  window.ondragover = event => event.preventDefault();
  window.ondrop = event => event.preventDefault();

  await navigator.serviceWorker.register("/service-worker.js");
}

main().catch(error => errorReporter.report(error));
