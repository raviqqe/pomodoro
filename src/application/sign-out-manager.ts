import { type AuthenticationController } from "./authentication-controller.js";
import { type AuthenticationPresenter } from "./authentication-presenter.js";
import { PerformanceGraphPresenter } from "./performance-graph-presenter.js";

export class SignOutManager {
  constructor(
    private readonly authenticationController: AuthenticationController,
    private readonly authenticationPresenter: AuthenticationPresenter,
    private readonly performanceGraphPresenter: PerformanceGraphPresenter,
  ) {}

  public async signOut(): Promise<void> {
    await this.authenticationController.signOut();

    this.authenticationPresenter.presentSignedIn(
      await this.authenticationController.isSignedIn(),
    );
    this.performanceGraphPresenter.presentGraph(null);
  }
}
