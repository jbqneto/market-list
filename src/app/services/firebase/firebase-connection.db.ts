import { Injectable } from '@angular/core';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment.development';
import { Database, getDatabase } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig: FirebaseOptions = {
  databaseURL: environment.databaseUrl
};

@Injectable({
  providedIn: 'root'
})
export class FirebaseConnection {
  private db: Database;

  public constructor() {
    const app = initializeApp(firebaseConfig);
    this.db = getDatabase(app);
  }


  public getDatabase(): Database {
    return this.db;
  }

}