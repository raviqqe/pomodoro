import { fireEvent, render, waitForDomChange } from "@testing-library/react";
import React from "react";
import { App } from "../App";

it("renders before a user signs in", async () => {
  const result = render(
    <App
      initialize={async () => ({ signedIn: false })}
      signIn={async () => true}
      signOut={async () => false}
      repositoryURL="url"
    />
  );

  await waitForDomChange(result);

  expect(result.container).toMatchSnapshot();
});

it("renders after a user signs in", async () => {
  const result = render(
    <App
      initialize={async () => ({ signedIn: true })}
      signIn={async () => true}
      signOut={async () => false}
      repositoryURL="url"
    />
  );

  await waitForDomChange(result);

  expect(result.container).toMatchSnapshot();
});

it("goes to a home screen when a user signs in", async () => {
  const { asFragment, container } = render(
    <App
      initialize={async () => ({ signedIn: false })}
      signIn={async () => true}
      signOut={async () => false}
      repositoryURL="url"
    />
  );

  await waitForDomChange({ container });

  fireEvent.click(container.querySelector("button") as Element);

  await waitForDomChange({ container });

  expect(asFragment()).toMatchSnapshot();
});
