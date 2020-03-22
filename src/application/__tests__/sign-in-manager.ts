import { IAuthenticationController } from "../authentication-controller";
import { SignInManager } from "../sign-in-manager";

it("signs in", async () => {
  const signInManager = new SignInManager(({
    signIn: jest.fn(),
  } as unknown) as IAuthenticationController);

  await signInManager.signIn();
});
