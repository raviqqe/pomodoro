import { SignOutManager } from "../application/sign-out-manager.js";
import { authenticationController } from "./authentication-controller.js";
import { authenticationPresenter } from "./authentication-presenter.js";
import { performanceGraphPresenter } from "./performance-graph-presenter.js";

export const signOutManager = new SignOutManager(
  authenticationController,
  authenticationPresenter,
  performanceGraphPresenter,
);
