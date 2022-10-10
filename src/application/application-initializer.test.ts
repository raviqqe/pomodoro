import { ApplicationInitializer } from "./application-initializer";
import { IAuthenticationController } from "./authentication-controller";
import { it, vi } from "vitest";

it("initializes", async () => {
  await new ApplicationInitializer(
    { isSignedIn: vi.fn() } as unknown as IAuthenticationController,
    { presentSignedIn: vi.fn() }
  ).initialize();
});
