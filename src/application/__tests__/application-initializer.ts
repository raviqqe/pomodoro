import { ApplicationInitializer } from "../application-initializer";
import { IAuthenticationController } from "../authentication-controller";

it("initializes", async () => {
  await new ApplicationInitializer(
    { initialize: jest.fn() },
    { isSignedIn: jest.fn() } as unknown as IAuthenticationController,
    { presentSignedIn: jest.fn() }
  ).initialize();
});
