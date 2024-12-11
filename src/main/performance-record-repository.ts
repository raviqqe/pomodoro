import { FirestorePerformanceRecordRepository } from "../infrastructure/firebase/firestore-performance-record-repository.js";
import { firebaseApp } from "./firebase-app.js";

export const performanceRecordRepository =
  new FirestorePerformanceRecordRepository(firebaseApp);
