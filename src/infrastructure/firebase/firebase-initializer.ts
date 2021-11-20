import firestore from "firebase/firestore";
import firebase, { FirebaseApp } from "firebase/app";

export class FirebaseInitializer {
  constructor(
    private readonly projectId: string,
    private readonly apiKey: string
  ) {}

  public async initialize(): Promise<FirebaseApp> {
    const app = firebase.initializeApp({
      apiKey: this.apiKey,
      authDomain: `${this.projectId}.firebaseapp.com`,
      projectId: this.projectId,
      storageBucket: `${this.projectId}.appspot.com`,
    });

    await firestore.enableMultiTabIndexedDbPersistence(
      firestore.getFirestore(app)
    );

    return app;
  }
}
