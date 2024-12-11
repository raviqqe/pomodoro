import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { ViewGraphButton } from "./ViewGraphButton.js";

it("renders", () => {
  expect(render(<ViewGraphButton />).container.firstChild).toMatchSnapshot();
});
