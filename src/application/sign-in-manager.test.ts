import { it } from "vitest";
import { SignInManager } from "./sign-in-manager";
import { authenticationPresenter, authenticationController } from "./test";

it("signs in", async () => {
  const signInManager = new SignInManager(
    authenticationController,
    authenticationPresenter
  );

  await signInManager.signIn();
});
