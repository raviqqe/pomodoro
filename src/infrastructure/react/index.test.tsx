import { it, vi } from "vitest";
import { ApplicationInitializer } from "../../application/application-initializer";
import { PerformanceGraphViewer } from "../../application/performance-graph-viewer";
import { PomodoroTimerStarter } from "../../application/pomodoro-timer-starter";
import { PomodoroTimerStopper } from "../../application/pomodoro-timer-stopper";
import { SignInManager } from "../../application/sign-in-manager";
import { SignOutManager } from "../../application/sign-out-manager";
import { ReactRenderer } from ".";

it("renders", () => {
  new ReactRenderer(
    document.createElement("div"),
    [],
    { initialize: vi.fn(async () => {}) } as unknown as ApplicationInitializer,
    {} as PerformanceGraphViewer,
    {} as PomodoroTimerStarter,
    {} as PomodoroTimerStopper,
    {} as SignInManager,
    {} as SignOutManager,
    ""
  ).render();
});
