import { it, vi } from "vitest";
import { ApplicationInitializer } from "./application-initializer.js";
import { type IAuthenticationController } from "./authentication-controller.js";

it("initializes", async () => {
  await new ApplicationInitializer(
    { isSignedIn: vi.fn() } as unknown as IAuthenticationController,
    { presentSignedIn: vi.fn() }
  ).initialize();
});
