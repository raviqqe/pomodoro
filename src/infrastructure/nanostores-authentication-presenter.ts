import { type AuthenticationPresenter } from "../application/authentication-presenter.js";
import { atom } from "nanostores";

export class NanostoresAuthenticationPresenter implements AuthenticationPresenter {
  public readonly signedIn = atom(false);

  public presentSignedIn(signedIn: boolean): void {
    this.signedIn.set(signedIn);
  }
}
