import { IAuthenticationController } from "../authentication-controller";
import { SignOutManager } from "../sign-out-manager";

it("signs in", async () => {
  const signOutManager = new SignOutManager(
    ({ signOut: jest.fn() } as unknown) as IAuthenticationController,
    { presentSignedIn: jest.fn() }
  );

  await signOutManager.signOut();
});
