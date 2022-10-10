import { render } from "@testing-library/react";
import { ViewGraph } from "./ViewGraph";
import { expect, it } from "vitest";

it("renders", () => {
  expect(
    render(<ViewGraph viewGraph={() => {}} />).container.firstChild
  ).toMatchSnapshot();
});
