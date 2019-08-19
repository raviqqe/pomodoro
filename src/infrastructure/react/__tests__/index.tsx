import { ApplicationInitializer } from "../../../application/application-initializer";
import { PomodoroTimerPauser } from "../../../application/pomodoro-timer-pauser";
import { PomodoroTimerStarter } from "../../../application/pomodoro-timer-starter";
import { PomodoroTimerRestarter } from "../../../application/pomodoro-timer-restarter";
import { SignInManager } from "../../../application/sign-in-manager";
import { SignOutManager } from "../../../application/sign-out-manager";
import { AuthenticationStore } from "../../mobx/authentication-store";
import { PomodoroTimerStore } from "../../mobx/pomodoro-timer-store";
import { ReactRenderer } from "..";

it("renders", () => {
  new ReactRenderer(
    {} as ApplicationInitializer,
    {} as PomodoroTimerPauser,
    {} as PomodoroTimerRestarter,
    {} as PomodoroTimerStarter,
    {} as SignInManager,
    {} as SignOutManager,
    new AuthenticationStore(),
    new PomodoroTimerStore(),
    "url"
  ).render(document.createElement("div"));
});
