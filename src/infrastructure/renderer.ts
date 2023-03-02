import { type IPerformanceGraph } from "../application/performance-graph";
import { type PomodoroTimerState } from "../application/pomodoro-timer-state";

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
