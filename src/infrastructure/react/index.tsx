import { render } from "react-dom";
import React from "react";
import { ApplicationInitializer } from "../../application/application-initializer";
import { SignInManager } from "../../application/sign-in-manager";
import { SignOutManager } from "../../application/sign-out-manager";
import { PerformanceGraphViewer } from "../../application/performance-graph-viewer";
import { PomodoroTimerStopper } from "../../application/pomodoro-timer-stopper";
import { PomodoroTimerStarter } from "../../application/pomodoro-timer-starter";
import { PomodoroTimerState } from "../../application/pomodoro-timer-state";
import { IRenderer, IPomodoroTimer } from "../renderer";
import { IPerformanceGraph } from "../../application/performance-graph";
import { App, IProps as IAppProps } from "./App";
import { GlobalStyle } from "./style";

interface IPresenter {
  setRenderer(renderer: IRenderer): void;
}

interface IProps
  extends Pick<IAppProps, "performanceGraph" | "signedIn" | "timer"> {}

export class ReactRenderer implements IRenderer {
  private props: IProps = {
    performanceGraph: { data: [] },
    signedIn: null,
    timer: { seconds: 0, state: PomodoroTimerState.Pomodoro, stopped: true },
  };

  constructor(
    private readonly element: HTMLElement,
    presenters: IPresenter[],
    private readonly applicationInitializer: ApplicationInitializer,
    private readonly performanceGraphViewer: PerformanceGraphViewer,
    private readonly pomodoroTimerStarter: PomodoroTimerStarter,
    private readonly pomodoroTimerStopper: PomodoroTimerStopper,
    private readonly signInManager: SignInManager,
    private readonly signOutManager: SignOutManager,
    private readonly repositoryURL: string
  ) {
    for (const presenter of presenters) {
      presenter.setRenderer(this);
    }
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

    render(
      <>
        <App
          {...this.props}
          initialize={() => this.applicationInitializer.initialize()}
          repositoryURL={this.repositoryURL}
          signIn={() => this.signInManager.signIn()}
          signOut={() => this.signOutManager.signOut()}
          startTimer={() => this.pomodoroTimerStarter.start()}
          stopTimer={() => this.pomodoroTimerStopper.stop()}
          viewGraph={() => this.performanceGraphViewer.viewGraph()}
        />
        <GlobalStyle />
      </>,
      this.element
    );
  }
}
