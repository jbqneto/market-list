import { Injectable } from "@angular/core";
import { AppService } from "../app.service";
import { FirebaseConnection } from "./firebase-connection.db";
import { Database, DatabaseReference, onValue, push, ref, remove } from "firebase/database";
import { Observable, Subject, of } from "rxjs";
import { Item } from "src/app/models/firebase-models";

export class FireBaseService extends AppService {
  private schema: DatabaseReference;
  private db: Database;
  private static SCHEMA = 'marketList';

  constructor() {
    super();
    this.db = new FirebaseConnection().getDatabase();
    this.schema = ref(this.db, FireBaseService.SCHEMA);
  } 

  public addItem(userId: string, item: string): Observable<void> {
    push(ref(this.db, this.getUserRef(userId)), item.trim().toLowerCase());

    return of();
  }

  public remove(userId: string, id: string): Observable<void> {
    const subject: Subject<void> = new Subject(); 
    remove(ref(this.db, this.getUserRef(userId) + '/' + id))
    .then(() => subject.next());

    return subject;
  }

  public listItems(userId: string): Observable<Item> {
    const subject: Subject<Item> = new Subject();
    const query = ref(this.db, this.getUserRef(userId));

    onValue(query, (snapshot) => {
      const value: Item = snapshot.val();
      subject.next(value);
    });
    
    return subject.asObservable();
  }

  private getUserRef(userId: string): string {
    return `${FireBaseService.SCHEMA}/${userId}`;
  }

}