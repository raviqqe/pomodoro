import { it, vi } from "vitest";
import { IAuthenticationController } from "./authentication-controller";
import { SignOutManager } from "./sign-out-manager";

it("signs in", async () => {
  const signOutManager = new SignOutManager(
    { signOut: vi.fn() } as unknown as IAuthenticationController,
    { presentSignedIn: vi.fn() }
  );

  await signOutManager.signOut();
});
