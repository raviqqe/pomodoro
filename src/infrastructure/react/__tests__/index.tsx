import { ApplicationInitializer } from "../../../application/application-initializer";
import { PomodoroTimerStopper } from "../../../application/pomodoro-timer-stopper";
import { PomodoroTimerStarter } from "../../../application/pomodoro-timer-starter";
import { SignInManager } from "../../../application/sign-in-manager";
import { SignOutManager } from "../../../application/sign-out-manager";
import { AuthenticationStore } from "../../mobx/authentication-store";
import { PomodoroTimerStore } from "../../mobx/pomodoro-timer-store";
import { ReactRenderer } from "..";

it("renders", () => {
  new ReactRenderer(
    {} as ApplicationInitializer,
    {} as PomodoroTimerStarter,
    {} as PomodoroTimerStopper,
    {} as SignInManager,
    {} as SignOutManager,
    new AuthenticationStore(),
    new PomodoroTimerStore(),
    "url"
  ).render(document.createElement("div"));
});
