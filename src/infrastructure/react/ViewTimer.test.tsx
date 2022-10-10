import { ViewTimer } from "./ViewTimer";
import { expect, it } from "vitest";
import { render } from "@testing-library/react";

it("renders", () => {
  expect(
    render(<ViewTimer viewTimer={() => {}} />).container.firstChild
  ).toMatchSnapshot();
});
