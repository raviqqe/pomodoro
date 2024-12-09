import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { type PerformanceGraph } from "../application/performance-graph.js";
import { PomodoroTimerState } from "../application/pomodoro-timer-state.js";
import { App, type Props as AppProps } from "./react/App.js";
import { globalStyle } from "./react/style.js";
import { type PomodoroTimer, type Renderer } from "./renderer.js";

interface Presenter {
  setRenderer(renderer: Renderer): void;
}

type Props = Pick<AppProps, "performanceGraph" | "timer">;

export class ReactRenderer implements Renderer {
  private readonly root: Root;
  private props: Props = {
    performanceGraph: { data: [] },
    timer: { seconds: 0, state: PomodoroTimerState.Pomodoro, stopped: true },
  };

  constructor(element: HTMLElement, presenters: Presenter[]) {
    for (const presenter of presenters) {
      presenter.setRenderer(this);
    }

    this.root = createRoot(element);
  }

  public render(): void {
    this.renderProps({});
  }

  public renderPerformanceGraph(performanceGraph: PerformanceGraph): void {
    this.renderProps({ performanceGraph });
  }

  public renderTimer(timer: PomodoroTimer): void {
    this.renderProps({ timer });
  }

  private renderProps(props: Partial<Props>): void {
    this.props = { ...this.props, ...props };

    this.root.render(
      <StrictMode>
        <style className={globalStyle} />
        <App {...this.props} />
      </StrictMode>,
    );
  }
}
