import firestore, { CollectionReference, Firestore } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";
import auth from "firebase/auth";
import { IPerformanceRecord } from "../../application/performance-record";
import { IPerformanceRecordRepository } from "../../application/performance-record-repository";
import { Auth } from "firebase/auth";

export class FirestorePerformanceRecordRepository
  implements IPerformanceRecordRepository
{
  private readonly auth: Auth;
  private readonly firestore: Firestore;

  constructor(app: FirebaseApp) {
    this.auth = auth.getAuth(app);
    this.firestore = firestore.getFirestore(app);
  }

  public async create(record: IPerformanceRecord): Promise<void> {
    await this.createOrUpdate(record);
  }

  public async findOne(date: string): Promise<IPerformanceRecord | null> {
    const snapshot = await firestore.getDocs(
      firestore.query(this.collection(), firestore.where("date", "==", date))
    );
    const documentSnapshot = snapshot.docs[0];

    return documentSnapshot
      ? (documentSnapshot.data() as IPerformanceRecord)
      : null;
  }

  public async findManySince(date: string): Promise<IPerformanceRecord[]> {
    const snapshot = await firestore.getDocs(
      firestore.query(
        this.collection(),
        firestore.where("date", ">=", date),
        firestore.orderBy("date")
      )
    );

    return snapshot.docs.map(
      (snapshot) => snapshot.data() as IPerformanceRecord
    );
  }

  public async update(record: IPerformanceRecord): Promise<void> {
    await this.createOrUpdate(record);
  }

  public async createOrUpdate(record: IPerformanceRecord): Promise<void> {
    await firestore.setDoc(
      firestore.doc(this.collection(), record.date),
      record
    );
  }

  private collection(): CollectionReference {
    const user = this.auth.currentUser;

    if (!user) {
      throw new Error("user not authenticated");
    }

    return firestore.collection(
      firestore.doc(firestore.collection(this.firestore, "users"), user.uid),
      "performanceRecords"
    );
  }
}
