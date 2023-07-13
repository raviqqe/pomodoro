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
import { type IPerformanceRecordRepository } from "../../application/performance-record-repository.js";
import { type IPerformanceRecord } from "../../application/performance-record.js";

export class FirestorePerformanceRecordRepository
  implements IPerformanceRecordRepository
{
  private readonly auth: Auth;
  private readonly firestore: Firestore;

  constructor(app: FirebaseApp) {
    this.auth = getAuth(app);
    this.firestore = getFirestore(app);
  }

  public async create(record: IPerformanceRecord): Promise<void> {
    await this.createOrUpdate(record);
  }

  public async findOne(date: string): Promise<IPerformanceRecord | null> {
    const snapshot = await getDocs(
      query(this.collection(), where("date", "==", date)),
    );
    const documentSnapshot = snapshot.docs[0];

    return documentSnapshot
      ? (documentSnapshot.data() as IPerformanceRecord)
      : null;
  }

  public async findManySince(date: string): Promise<IPerformanceRecord[]> {
    const snapshot = await getDocs(
      query(this.collection(), where("date", ">=", date), orderBy("date")),
    );

    return snapshot.docs.map(
      (snapshot) => snapshot.data() as IPerformanceRecord,
    );
  }

  public async update(record: IPerformanceRecord): Promise<void> {
    await this.createOrUpdate(record);
  }

  public async createOrUpdate(record: IPerformanceRecord): Promise<void> {
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
