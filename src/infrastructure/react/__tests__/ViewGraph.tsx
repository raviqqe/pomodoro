import React from "react";
import { create } from "react-test-renderer";
import { ViewGraph } from "../ViewGraph";

it("renders", () => {
  expect(create(<ViewGraph viewGraph={() => {}} />).toJSON()).toMatchSnapshot();
});
