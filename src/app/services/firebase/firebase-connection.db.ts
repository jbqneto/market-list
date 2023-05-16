import { Database } from "firebase/database";
import { FirebaseHelper } from './firebase-config';

export class FirebaseConnection {
  private db: Database;

  public constructor() {
    this.db = FirebaseHelper.getDatabase();
  }


  public getDatabase(): Database {
    return this.db;
  }

}