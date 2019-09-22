import { ApplicationInitializer } from "../../../application/application-initializer";
import { PerformanceGraphViewer } from "../../../application/performance-graph-viewer";
import { PomodoroTimerStopper } from "../../../application/pomodoro-timer-stopper";
import { PomodoroTimerStarter } from "../../../application/pomodoro-timer-starter";
import { SignInManager } from "../../../application/sign-in-manager";
import { SignOutManager } from "../../../application/sign-out-manager";
import { AuthenticationStore } from "../../mobx/authentication-store";
import { PerformanceGraphStore } from "../../mobx/performance-graph-store";
import { PomodoroTimerStore } from "../../mobx/pomodoro-timer-store";
import { ReactRenderer } from "..";

it("renders", () => {
  new ReactRenderer(
    {} as ApplicationInitializer,
    {} as PerformanceGraphViewer,
    {} as PomodoroTimerStarter,
    {} as PomodoroTimerStopper,
    {} as SignInManager,
    {} as SignOutManager,
    new AuthenticationStore(),
    new PomodoroTimerStore(),
    new PerformanceGraphStore(),
    ""
  ).render(document.createElement("div"));
});
