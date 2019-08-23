import { create } from "react-test-renderer";
import React from "react";
import { ViewGraph } from "../ViewGraph";

it("renders", () => {
  expect(
    create(<ViewGraph viewGraph={() => undefined} />).toJSON()
  ).toMatchSnapshot();
});
