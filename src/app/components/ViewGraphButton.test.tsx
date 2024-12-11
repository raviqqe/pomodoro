import { expect, it } from "vitest";
import { ViewGraphButton } from "./ViewGraphButton.js";
import { renderRouter } from "../test.js";

it("renders", () => {
  expect(
    renderRouter(<ViewGraphButton />).container.firstChild,
  ).toMatchSnapshot();
});
