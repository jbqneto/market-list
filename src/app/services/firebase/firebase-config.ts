import { Injectable } from '@angular/core';
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { Database, getDatabase } from 'firebase/database';
import { Auth, getAuth } from "firebase/auth";
import { environment } from 'src/environments/environment.development';


export class FirebaseHelper {

  private static app: FirebaseApp | null = null;
  private static config: FirebaseOptions = {
    appId: environment.fbProject,
    authDomain: `${environment.fbProject}.firebaseapp.com`,
    apiKey: environment.fbKey,
    databaseURL: environment.databaseUrl
  }

  private static getApp(): FirebaseApp {
    if (FirebaseHelper.app === null) {
      FirebaseHelper.app = initializeApp(FirebaseHelper.config);
    }

    return FirebaseHelper.app;
  }

  public static getDatabase(): Database  {
    return getDatabase(this.getApp());
  }

  public static getAuth(): Auth {
    return getAuth(this.getApp());
  }

}