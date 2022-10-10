import { Landing } from "./Landing";
import { expect, it } from "vitest";
import { render } from "@testing-library/react";

it("renders", () => {
  expect(
    render(<Landing repositoryURL="" signIn={async () => {}} />).container
      .firstChild
  ).toMatchSnapshot();
});
