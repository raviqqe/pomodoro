import { expect, it } from "vitest";
import { SignOutManager } from "./sign-out-manager.js";
import {
  performanceGraphPresenter,
  authenticationController,
  authenticationPresenter,
} from "./test.js";

it("signs out", async () => {
  const signOutManager = new SignOutManager(
    authenticationController,
    authenticationPresenter,
    performanceGraphPresenter,
  );

  await signOutManager.signOut();

  expect(authenticationController.signOut).toHaveBeenCalledOnce();
  expect(authenticationPresenter.presentSignedIn).toHaveBeenCalledOnce();
  expect(performanceGraphPresenter.presentGraph).toHaveBeenCalledOnce();
});
