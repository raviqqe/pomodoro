import { it, vi } from "vitest";
import { ApplicationInitializer } from "./application-initializer";
import { type IAuthenticationController } from "./authentication-controller";

it("initializes", async () => {
  await new ApplicationInitializer(
    { isSignedIn: vi.fn() } as unknown as IAuthenticationController,
    { presentSignedIn: vi.fn() }
  ).initialize();
});
