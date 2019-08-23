import { create } from "react-test-renderer";
import React from "react";
import { ViewTimer } from "../ViewTimer";

it("renders", () => {
  expect(
    create(<ViewTimer viewTimer={() => undefined} />).toJSON()
  ).toMatchSnapshot();
});
