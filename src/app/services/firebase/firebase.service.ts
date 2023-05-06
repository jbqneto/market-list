import { Injectable } from "@angular/core";
import { AppService } from "../app.service";
import { environment } from 'src/environments/environment.development';
import { FirebaseConnection } from "./firebase-connection.db";
import { Database, DatabaseReference, child, get, onValue, push, ref, remove,  } from "firebase/database";
import { Observable, Subject, map, of } from "rxjs";
import { Item } from "src/app/models/firebase-models";

@Injectable()
export class FireBaseService extends AppService {
  private schema: DatabaseReference;
  private db: Database;
  private static SCHEMA = 'marketList';

  constructor(db: FirebaseConnection) {
    super();
    this.db = db.getDatabase();
    this.schema = ref(this.db, FireBaseService.SCHEMA);
  } 

  public addItem(item: string): void {
    push(this.schema, item.toLowerCase());
  }

  public remove(id: string): Observable<void> {
    const subject: Subject<void> = new Subject(); 
    console.log('will remove: ' + id);
    remove(ref(this.db, `${FireBaseService.SCHEMA}/${id}`)).then((response) => {
      subject.next();
    });

    return subject;
  }

  public listItems(): Observable<Item> {
    const subject: Subject<Item> = new Subject();

    onValue(this.schema, (snapshot) => {
      const value: Item = snapshot.val();
      subject.next(value);
    });
    
    return subject.asObservable();
  }

}