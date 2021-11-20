import { FirebaseApp } from "firebase/app";
import auth from "firebase/auth";
import {
  Auth,
  GoogleAuthProvider,
  signInWithRedirect,
  User,
} from "firebase/auth";
import { IAuthenticationController } from "../../application/authentication-controller";
import { sleep } from "../../domain/utilities";

export class FirebaseAuthenticationController
  implements IAuthenticationController
{
  private auth: Auth;
  private signedIn: boolean | null = null;

  constructor(app: FirebaseApp) {
    this.auth = auth.getAuth(app);
    this.auth.onAuthStateChanged((user: User | null): void => {
      this.signedIn = !!user;
    });
  }

  public async signIn(): Promise<void> {
    await signInWithRedirect(this.auth, new GoogleAuthProvider());
  }

  public async signOut(): Promise<boolean> {
    await this.auth.signOut();
    return this.isSignedIn();
  }

  public async isSignedIn(): Promise<boolean> {
    while (this.signedIn === null) {
      await sleep(10);
    }

    return this.signedIn;
  }
}
