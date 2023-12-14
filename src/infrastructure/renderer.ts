import { type PerformanceGraph } from "../application/performance-graph.js";
import { type PomodoroTimerState } from "../application/pomodoro-timer-state.js";

export interface PomodoroTimer {
  seconds: number;
  state: PomodoroTimerState;
  stopped: boolean;
}

export interface Renderer {
  renderPerformanceGraph(graph: PerformanceGraph): void;
  renderSignedIn(signedIn: boolean): void;
  renderTimer(timer: PomodoroTimer): void;
}
