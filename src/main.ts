import "@fontsource/chelsea-market";
import "@fontsource/roboto";
import { errorReporter } from "./main/error-reporter.js";
import { render } from "./infrastructure/react.js";

try {
  const element = document.getElementById("root");

  if (!element) {
    throw new Error("no root element");
  }

  render(element);
} catch (error) {
  errorReporter.report(error);
}
