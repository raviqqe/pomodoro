import { type AuthenticationPresenter } from "../application/authentication-presenter.js";
import { atom } from "nanostores";

export class NanostoresAuthenticationPresenter
  implements AuthenticationPresenter
{
  public readonly signedIn = atom<boolean | null>(null);

  public presentSignedIn(signedIn: boolean): void {
    this.signedIn.set(signedIn);
  }
}
