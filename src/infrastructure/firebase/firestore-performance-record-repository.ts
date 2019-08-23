import "firebase/firestore";
import * as firebase from "firebase/app";
import { IPerformanceRecordRepository } from "../../application/performance-record-repository";
import { IPerformanceRecord } from "../../application/performance-record";

export class FirestorePerformanceRecordRepository
  implements IPerformanceRecordRepository {
  public async create(record: IPerformanceRecord): Promise<void> {
    await this.createOrUpdate(record);
  }

  public async findOne(date: string): Promise<IPerformanceRecord | null> {
    const querySnapshot = await this.collection()
      .where("date", "==", date)
      .get();
    const documentSnapshot = querySnapshot.docs[0];

    return documentSnapshot
      ? (documentSnapshot.data() as IPerformanceRecord)
      : null;
  }

  public async findManySince(date: string): Promise<IPerformanceRecord[]> {
    const querySnapshot = await this.collection()
      .where("date", ">=", date)
      .orderBy("date")
      .get();

    return querySnapshot.docs.map(
      snapshot => snapshot.data() as IPerformanceRecord
    );
  }

  public async update(record: IPerformanceRecord): Promise<void> {
    await this.createOrUpdate(record);
  }

  public async createOrUpdate(record: IPerformanceRecord): Promise<void> {
    await this.collection()
      .doc(record.date)
      .set(record);
  }

  private collection(): firebase.firestore.CollectionReference {
    const user = firebase.auth().currentUser;

    if (!user) {
      throw new Error("user not authenticated");
    }

    return firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .collection("performanceRecords");
  }
}
