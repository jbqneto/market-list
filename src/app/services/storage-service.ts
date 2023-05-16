import { Injectable } from "@angular/core";
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage: Storage;
  private prefix = '_flpwa_';

  constructor() {
    this.storage = window.localStorage;
  }

  public put(key: string, value: any) {
    this.setItem(key, JSON.stringify(value));
  }

  public remove(key: string) {
    this.removeItem(key);
  }

  public get<T>(key: string): T | null {
    const item = this.getItem(key);

    if (item === null)
      return null;

    return <T> JSON.parse(item);
  }
  
  
  private getItem(key: string): string | null {
    return this.storage.getItem(this.prefix + key)
  }

  private removeItem(key: string): void {
    this.storage.removeItem(this.prefix+key);
  }

  private setItem(key: string, valueStringifyed: string): void {
    this.storage.setItem(this.prefix+key, valueStringifyed);
  }

}