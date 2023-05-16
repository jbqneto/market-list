import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Item } from "../models/firebase-models";

@Injectable()
export abstract class AppService {

  public abstract addItem(userId: string, item: string): Observable<void>;
  public abstract listItems(userId: string): Observable<Item>;
  public abstract remove(userId: string, id: string): Observable<void>
  
}