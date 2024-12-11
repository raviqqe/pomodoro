import { expect, it } from "vitest";
import { ViewTimerButton } from "./ViewTimerButton.js";
import { renderRouter } from "../test.js";

it("renders", () => {
  expect(
    renderRouter(<ViewTimerButton />).container.firstChild,
  ).toMatchSnapshot();
});
