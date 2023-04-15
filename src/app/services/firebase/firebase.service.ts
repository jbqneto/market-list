import { Injectable } from "@angular/core";
import { AppService } from "../app.service";
import { environment } from 'src/environments/environment.development';
import { FirebaseConnection } from "./firebase-connection.db";
import { DatabaseReference, child, get, onValue, push, ref,  } from "firebase/database";
import { Observable, Subject, map, of } from "rxjs";

@Injectable()
export class FireBaseService extends AppService {
  private schema: DatabaseReference;
  private static SCHEMA = 'marketList';

  constructor(db: FirebaseConnection) {
    super();
    this.schema = ref(db.getDatabase(), FireBaseService.SCHEMA);
  } 

  public addItem(item: string): void {
    const response = push(this.schema, item);
  
    console.log(response);
  }

  public listItems(): Observable<string[]> {
    const subject: Subject<string[]> = new Subject();
    
    get(this.schema).then((snapshot) => {
      subject.next(snapshot.val());
    });
    

    return subject.asObservable();
  }

}