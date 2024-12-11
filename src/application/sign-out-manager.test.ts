import { expect, it } from "vitest";
import { SignOutManager } from "./sign-out-manager.js";
import { authenticationController } from "./test/authentication-controller.js";
import { authenticationPresenter } from "./test/authentication-presenter.js";
import { performanceGraphPresenter } from "./test/performance-graph-presenter.js";

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
