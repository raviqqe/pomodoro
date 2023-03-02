import { it, vi } from "vitest";
import { type ApplicationInitializer } from "../../application/application-initializer";
import { type PerformanceGraphViewer } from "../../application/performance-graph-viewer";
import { type PomodoroTimerStarter } from "../../application/pomodoro-timer-starter";
import { type PomodoroTimerStopper } from "../../application/pomodoro-timer-stopper";
import { type SignInManager } from "../../application/sign-in-manager";
import { type SignOutManager } from "../../application/sign-out-manager";
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
