import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { type ApplicationInitializer } from "../application/application-initializer.js";
import { type PerformanceGraphViewer } from "../application/performance-graph-viewer.js";
import { type IPerformanceGraph } from "../application/performance-graph.js";
import { type PomodoroTimerStarter } from "../application/pomodoro-timer-starter.js";
import { PomodoroTimerState } from "../application/pomodoro-timer-state.js";
import { type PomodoroTimerStopper } from "../application/pomodoro-timer-stopper.js";
import { type SignInManager } from "../application/sign-in-manager.js";
import { type SignOutManager } from "../application/sign-out-manager.js";
import { App, type IProps as IAppProps } from "./react/App.js";
import { globalStyle } from "./react/style.js";
import { type IRenderer, type IPomodoroTimer } from "./renderer.js";

interface IPresenter {
  setRenderer(renderer: IRenderer): void;
}

interface IProps
  extends Pick<IAppProps, "performanceGraph" | "signedIn" | "timer"> {}

export class ReactRenderer implements IRenderer {
  private readonly root: Root;
  private props: IProps = {
    performanceGraph: { data: [] },
    signedIn: null,
    timer: { seconds: 0, state: PomodoroTimerState.Pomodoro, stopped: true },
  };

  constructor(
    element: HTMLElement,
    presenters: IPresenter[],
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

  public renderPerformanceGraph(performanceGraph: IPerformanceGraph): void {
    this.renderProps({ performanceGraph });
  }

  public renderSignedIn(signedIn: boolean): void {
    this.renderProps({ signedIn });
  }

  public renderTimer(timer: IPomodoroTimer): void {
    this.renderProps({ timer });
  }

  private renderProps(props: Partial<IProps>): void {
    this.props = { ...this.props, ...props };

    this.root.render(
      <StrictMode>
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
        <style>{globalStyle}</style>
      </StrictMode>,
    );
  }
}
