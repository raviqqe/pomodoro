import { it, vi } from "vitest";
import { IAuthenticationController } from "./authentication-controller";
import { SignInManager } from "./sign-in-manager";

it("signs in", async () => {
  const signInManager = new SignInManager({
    signIn: vi.fn(),
  } as unknown as IAuthenticationController);

  await signInManager.signIn();
});
