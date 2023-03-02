import { type IPerformanceGraph } from "../application/performance-graph.js";
import { type PomodoroTimerState } from "../application/pomodoro-timer-state.js";

export interface IPomodoroTimer {
  seconds: number;
  state: PomodoroTimerState;
  stopped: boolean;
}

export interface IRenderer {
  renderPerformanceGraph(graph: IPerformanceGraph): void;
  renderSignedIn(signedIn: boolean): void;
  renderTimer(timer: IPomodoroTimer): void;
}
