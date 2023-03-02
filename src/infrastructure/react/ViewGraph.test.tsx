import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { ViewGraph } from "./ViewGraph.js";

it("renders", () => {
  expect(
    render(<ViewGraph viewGraph={() => {}} />).container.firstChild
  ).toMatchSnapshot();
});
