import { ApplicationInitializer } from "../application-initializer";
import { IAuthenticationController } from "../authentication-controller";

it("initializes", async () => {
  await new ApplicationInitializer(
    { isSignedIn: jest.fn() } as unknown as IAuthenticationController,
    { presentSignedIn: jest.fn() }
  ).initialize();
});
