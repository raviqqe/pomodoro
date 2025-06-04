import { type AuthenticationController } from "./authentication-controller.js";
import { type AuthenticationPresenter } from "./authentication-presenter.js";
import { type PerformanceGraphPresenter } from "./performance-graph-presenter.js";

export class SignOutManager {
  private readonly authenticationController: AuthenticationController;
  private readonly authenticationPresenter: AuthenticationPresenter;
  private readonly performanceGraphPresenter: PerformanceGraphPresenter;

  constructor(
    authenticationController: AuthenticationController,
    authenticationPresenter: AuthenticationPresenter,
    performanceGraphPresenter: PerformanceGraphPresenter,
  ) {
    this.authenticationController = authenticationController;
    this.authenticationPresenter = authenticationPresenter;
    this.performanceGraphPresenter = performanceGraphPresenter;
  }

  public async signOut(): Promise<void> {
    await this.authenticationController.signOut();

    this.authenticationPresenter.presentSignedIn(
      await this.authenticationController.isSignedIn(),
    );
    this.performanceGraphPresenter.presentGraph(null);
  }
}
