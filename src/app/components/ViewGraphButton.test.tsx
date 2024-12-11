import { expect, it } from "vitest";
import { renderRouter } from "../test.js";
import { ViewGraphButton } from "./ViewGraphButton.js";

it("renders", () => {
  expect(
    renderRouter(<ViewGraphButton />).container.firstChild,
  ).toMatchSnapshot();
});
