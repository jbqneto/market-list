import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { User } from "src/app/models/user";
import { FirebaseHelper } from "./firebase-config";
import { Auth, onAuthStateChanged } from "firebase/auth";
import { StorageService } from "../storage-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private onAuthenticate$: Subject<User | null>;
  private auth: Auth;

  public constructor(private storage: StorageService) {
    this.onAuthenticate$ = new Subject<User | null>;
    this.auth = FirebaseHelper.getAuth();
    onAuthStateChanged(this.auth, data => {
      if (data) {
        data.getIdToken().then((token) => {
          const user = new User(data.uid, data.email ?? '', data.displayName ?? '', token);
          this.storage.put('user', user);
          this.onAuthenticate$.next(user);
        });
      } else {
        this.storage.remove('user');
        this.onAuthenticate$.next(null);
      }
    })
  }

  public getUser(): User | null {
    return this.storage.get<User>('user');
  }

  public getAuth(): Auth {
    return this.auth;
  }

  public logout(): Promise<void> {
    this.storage.remove('user');
    return this.auth.signOut();
  }

  public onAuthenticate(): Observable<User | null> {
    return this.onAuthenticate$.asObservable();
  }


}