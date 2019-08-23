import { render } from "react-dom";
import React from "react";
import { ApplicationInitializer } from "../../application/application-initializer";
import { SignInManager } from "../../application/sign-in-manager";
import { SignOutManager } from "../../application/sign-out-manager";
import { PerformanceGraphViewer } from "../../application/performance-graph-viewer";
import { PomodoroTimerStopper } from "../../application/pomodoro-timer-stopper";
import { PomodoroTimerStarter } from "../../application/pomodoro-timer-starter";
import { PomodoroTimerStore } from "../mobx/pomodoro-timer-store";
import { AuthenticationStore } from "../mobx/authentication-store";
import { PerformanceGraphStore } from "../mobx/performance-graph-store";
import { App } from "./App";
import { GlobalStyle } from "./style";

export class ReactRenderer {
  constructor(
    private readonly applicationInitializer: ApplicationInitializer,
    private readonly performanceGraphViewer: PerformanceGraphViewer,
    private readonly pomodoroTimerStarter: PomodoroTimerStarter,
    private readonly pomodoroTimerStopper: PomodoroTimerStopper,
    private readonly signInManager: SignInManager,
    private readonly signOutManager: SignOutManager,
    private readonly authenticationStore: AuthenticationStore,
    private readonly pomodoroTimerStore: PomodoroTimerStore,
    private readonly performanceGraphStore: PerformanceGraphStore,
    private readonly repositoryURL: string
  ) {}

  public render(element: HTMLElement): void {
    render(
      <>
        <App
          authenticationStore={this.authenticationStore}
          pomodoroTimerStore={this.pomodoroTimerStore}
          performanceGraphStore={this.performanceGraphStore}
          initialize={() => this.applicationInitializer.initialize()}
          repositoryURL={this.repositoryURL}
          signIn={() => this.signInManager.signIn()}
          signOut={() => this.signOutManager.signOut()}
          stopTimer={() => this.pomodoroTimerStopper.stop()}
          startTimer={() => this.pomodoroTimerStarter.start()}
          viewGraph={() => this.performanceGraphViewer.viewGraph()}
        />
        <GlobalStyle />
      </>,
      element
    );
  }
}
