import { it, vi } from "vitest";
import { type ApplicationInitializer } from "../application/application-initializer.js";
import { type PerformanceGraphViewer } from "../application/performance-graph-viewer.js";
import { type PomodoroTimerStarter } from "../application/pomodoro-timer-starter.js";
import { type PomodoroTimerStopper } from "../application/pomodoro-timer-stopper.js";
import { type SignInManager } from "../application/sign-in-manager.js";
import { type SignOutManager } from "../application/sign-out-manager.js";
import { ReactRenderer } from "./react.js";

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
    "",
  ).render();
});
