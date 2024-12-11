import { expect, it } from "vitest";
import { renderRouter } from "../test.js";
import { ViewTimerButton } from "./ViewTimerButton.js";

it("renders", () => {
  expect(
    renderRouter(<ViewTimerButton />).container.firstChild,
  ).toMatchSnapshot();
});
