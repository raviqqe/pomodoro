import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { type ApplicationInitializer } from "../application/application-initializer.js";
import { type PerformanceGraphViewer } from "../application/performance-graph-viewer.js";
import { type PerformanceGraph } from "../application/performance-graph.js";
import { type PomodoroTimerStarter } from "../application/pomodoro-timer-starter.js";
import { PomodoroTimerState } from "../application/pomodoro-timer-state.js";
import { type PomodoroTimerStopper } from "../application/pomodoro-timer-stopper.js";
import { type SignInManager } from "../application/sign-in-manager.js";
import { type SignOutManager } from "../application/sign-out-manager.js";
import { App, type Props as AppProps } from "./react/App.js";
import { globalStyle } from "./react/style.js";
import { type Renderer, type PomodoroTimer } from "./renderer.js";

interface Presenter {
  setRenderer(renderer: Renderer): void;
}

interface Props
  extends Pick<AppProps, "performanceGraph" | "signedIn" | "timer"> {}

export class ReactRenderer implements Renderer {
  private readonly root: Root;
  private props: Props = {
    performanceGraph: { data: [] },
    signedIn: null,
    timer: { seconds: 0, state: PomodoroTimerState.Pomodoro, stopped: true },
  };

  constructor(
    element: HTMLElement,
    presenters: Presenter[],
    private readonly applicationInitializer: ApplicationInitializer,
    private readonly performanceGraphViewer: PerformanceGraphViewer,
    private readonly pomodoroTimerStarter: PomodoroTimerStarter,
    private readonly pomodoroTimerStopper: PomodoroTimerStopper,
    private readonly signInManager: SignInManager,
    private readonly signOutManager: SignOutManager,
    private readonly repositoryUrl: string,
  ) {
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

  public renderSignedIn(signedIn: boolean): void {
    this.renderProps({ signedIn });
  }

  public renderTimer(timer: PomodoroTimer): void {
    this.renderProps({ timer });
  }

  private renderProps(props: Partial<Props>): void {
    this.props = { ...this.props, ...props };

    this.root.render(
      <StrictMode>
        <style>{globalStyle}</style>
        <App
          {...this.props}
          initialize={() => this.applicationInitializer.initialize()}
          repositoryUrl={this.repositoryUrl}
          signIn={() => this.signInManager.signIn()}
          signOut={() => this.signOutManager.signOut()}
          startTimer={() => this.pomodoroTimerStarter.start()}
          stopTimer={() => this.pomodoroTimerStopper.stop()}
          viewGraph={() => this.performanceGraphViewer.viewGraph()}
        />
      </StrictMode>,
    );
  }
}
