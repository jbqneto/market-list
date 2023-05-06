import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Item } from "../models/firebase-models";

@Injectable()
export abstract class AppService {

  public abstract addItem(item: string): void;
  public abstract listItems(): Observable<Item>;
  public abstract remove(id: string): Observable<void>
  
}