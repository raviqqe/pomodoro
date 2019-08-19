import { render } from "react-dom";
import React from "react";
import { ApplicationInitializer } from "../../application/application-initializer";
import { SignInManager } from "../../application/sign-in-manager";
import { SignOutManager } from "../../application/sign-out-manager";
import { PomodoroTimerPauser } from "../../application/pomodoro-timer-pauser";
import { PomodoroTimerStarter } from "../../application/pomodoro-timer-starter";
import { PomodoroTimerRestarter } from "../../application/pomodoro-timer-restarter";
import { PomodoroTimerStore } from "../mobx/pomodoro-timer-store";
import { AuthenticationStore } from "../mobx/authentication-store";
import { App } from "./App";
import { GlobalStyle } from "./style";

export class ReactRenderer {
  constructor(
    private readonly applicationInitializer: ApplicationInitializer,
    private readonly pomodoroTimerPauser: PomodoroTimerPauser,
    private readonly pomodoroTimerRestarter: PomodoroTimerRestarter,
    private readonly pomodoroTimerStarter: PomodoroTimerStarter,
    private readonly signInManager: SignInManager,
    private readonly signOutManager: SignOutManager,
    private readonly authenticationStore: AuthenticationStore,
    private readonly pomodoroTimerStore: PomodoroTimerStore,
    private readonly repositoryURL: string
  ) {}

  public render(element: HTMLElement): void {
    render(
      <>
        <App
          authenticationStore={this.authenticationStore}
          pomodoroTimerStore={this.pomodoroTimerStore}
          initialize={() => this.applicationInitializer.initialize()}
          repositoryURL={this.repositoryURL}
          signIn={() => this.signInManager.signIn()}
          signOut={() => this.signOutManager.signOut()}
          pauseTimer={() => this.pomodoroTimerPauser.pause()}
          startTimer={() => this.pomodoroTimerStarter.start()}
          restartTimer={() => this.pomodoroTimerRestarter.restart()}
        />
        <GlobalStyle />
      </>,
      element
    );
  }
}
