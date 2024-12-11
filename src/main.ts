import "@fontsource/chelsea-market";
import "@fontsource/roboto";
import { render } from "./app/render.js";
import { errorReporter } from "./main/error-reporter.js";

try {
  const element = document.getElementById("root");

  if (!element) {
    throw new Error("no root element");
  }

  render(element);
} catch (error) {
  errorReporter.report(error);
}
