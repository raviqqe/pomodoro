import { render } from "@testing-library/react";
import { SignIn } from "./SignIn";
import { expect, it } from "vitest";

it("renders", () => {
  expect(
    render(<SignIn signIn={() => {}} />).container.firstChild
  ).toMatchSnapshot();
});
