import { it } from "vitest";
import { type PerformanceGraphViewer } from "../application/performance-graph-viewer.js";
import { type PomodoroTimerStarter } from "../application/pomodoro-timer-starter.js";
import { type PomodoroTimerStopper } from "../application/pomodoro-timer-stopper.js";
import { ReactRenderer } from "./react.js";

it("renders", () => {
  new ReactRenderer(
    document.createElement("div"),
    [],
    {} as PerformanceGraphViewer,
    {} as PomodoroTimerStarter,
    {} as PomodoroTimerStopper,
  ).render();
});
