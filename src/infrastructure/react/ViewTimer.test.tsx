import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { ViewTimer } from "./ViewTimer";

it("renders", () => {
  expect(
    render(<ViewTimer viewTimer={() => {}} />).container.firstChild
  ).toMatchSnapshot();
});
