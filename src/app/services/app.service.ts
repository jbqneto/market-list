import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export abstract class AppService {

  public abstract addItem(item: string): void;
  public abstract listItems(): Observable<string[]>;
  
}