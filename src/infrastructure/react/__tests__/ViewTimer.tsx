import React from "react";
import { create } from "react-test-renderer";
import { ViewTimer } from "../ViewTimer";

it("renders", () => {
  expect(create(<ViewTimer viewTimer={() => {}} />).toJSON()).toMatchSnapshot();
});
