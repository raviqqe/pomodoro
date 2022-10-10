import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { ViewGraph } from "./ViewGraph";

it("renders", () => {
  expect(
    render(<ViewGraph viewGraph={() => {}} />).container.firstChild
  ).toMatchSnapshot();
});
