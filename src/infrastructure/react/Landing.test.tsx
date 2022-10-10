import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { Landing } from "./Landing";

it("renders", () => {
  expect(
    render(<Landing repositoryURL="" signIn={async () => {}} />).container
      .firstChild
  ).toMatchSnapshot();
});
