import { SignOut } from "./SignOut";
import { expect, it } from "vitest";
import { render } from "@testing-library/react";

it("renders", () => {
  expect(
    render(<SignOut signOut={() => {}} />).container.firstChild
  ).toMatchSnapshot();
});
