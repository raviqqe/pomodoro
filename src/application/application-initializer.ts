import { IAuthenticationController } from "./authentication-controller";
import { IAuthenticationPresenter } from "./authentication-presenter";
import { IInfrastructureInitializer } from "./infrastructure-initializer";

export class ApplicationInitializer {
  constructor(
    private readonly infrastructureInitializer: IInfrastructureInitializer,
    private readonly authenticationController: IAuthenticationController,
    private readonly authenticationPresenter: IAuthenticationPresenter
  ) {}

  public async initialize(): Promise<void> {
    await this.infrastructureInitializer.initialize();
    this.authenticationPresenter.presentSignedIn(
      await this.authenticationController.isSignedIn()
    );
  }
}
