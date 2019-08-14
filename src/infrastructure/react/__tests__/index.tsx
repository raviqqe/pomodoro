import { ApplicationInitializer } from "../../../application/application-initializer";
import { SignInManager } from "../../../application/sign-in-manager";
import { SignOutManager } from "../../../application/sign-out-manager";
import { ReactRenderer } from "..";

it("renders", () => {
  new ReactRenderer(
    {} as ApplicationInitializer,
    {} as SignInManager,
    {} as SignOutManager,
    "url"
  ).render(document.createElement("div"));
});
