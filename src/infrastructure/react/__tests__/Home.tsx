import { create } from "react-test-renderer";
import React from "react";
import { Home } from "../Home";

it("renders", () => {
  expect(
    create(<Home signOut={async () => undefined} />).toJSON()
  ).toMatchSnapshot();
});
