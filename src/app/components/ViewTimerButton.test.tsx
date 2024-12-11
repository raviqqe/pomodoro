import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { ViewTimerButton } from "./ViewTimerButton.js";

it("renders", () => {
  expect(render(<ViewTimerButton />).container.firstChild).toMatchSnapshot();
});
