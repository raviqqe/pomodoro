import { type FirebaseApp } from "firebase/app";
import { type Auth, getAuth } from "firebase/auth";
import {
  collection,
  type CollectionReference,
  doc,
  type Firestore,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { type PerformanceRecordRepository } from "../../application/performance-record-repository.js";
import { type PerformanceRecord } from "../../application/performance-record.js";

export class FirestorePerformanceRecordRepository
  implements PerformanceRecordRepository
{
  private readonly auth: Auth;
  private readonly firestore: Firestore;

  constructor(app: FirebaseApp) {
    this.auth = getAuth(app);
    this.firestore = getFirestore(app);
  }

  public async create(record: PerformanceRecord): Promise<void> {
    await this.createOrUpdate(record);
  }

  public async findOne(date: string): Promise<PerformanceRecord | null> {
    const snapshot = await getDocs(
      query(this.collection(), where("date", "==", date)),
    );
    const documentSnapshot = snapshot.docs[0];

    return documentSnapshot
      ? (documentSnapshot.data() as PerformanceRecord)
      : null;
  }

  public async findManySince(date: string): Promise<PerformanceRecord[]> {
    const snapshot = await getDocs(
      query(this.collection(), where("date", ">=", date), orderBy("date")),
    );

    return snapshot.docs.map(
      (snapshot) => snapshot.data() as PerformanceRecord,
    );
  }

  public async update(record: PerformanceRecord): Promise<void> {
    await this.createOrUpdate(record);
  }

  public async createOrUpdate(record: PerformanceRecord): Promise<void> {
    await setDoc(doc(this.collection(), record.date), record);
  }

  private collection(): CollectionReference {
    const user = this.auth.currentUser;

    if (!user) {
      throw new Error("user not authenticated");
    }

    return collection(
      doc(collection(this.firestore, "users"), user.uid),
      "performanceRecords",
    );
  }
}
