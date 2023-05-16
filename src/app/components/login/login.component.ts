import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getRedirectResult } from 'firebase/auth';

import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/firebase/firebase-auth.service';
import { FirebaseHelper } from 'src/app/services/firebase/firebase-config';
import { StorageService } from 'src/app/services/storage-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  public user: User | null = null;

  public constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  private fireConfig = {
    signInSuccessUrl: 'http://localhost:4200/login',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID
      },
      {
        provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        scopes: [
          'public_profile',
          'email'
        ]
      }
      
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: 'http://localhost:4200/policy',
    // Privacy policy url/callback.
    privacyPolicyUrl: function() {
      window.location.assign('http://localhost:4200/policy');
    }
  };

  public ngAfterViewInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.redirect();
    } else {
      const ui = new firebaseui.auth.AuthUI(this.authService.getAuth());
      ui.start('#firebase-container', this.fireConfig);
    }

  }

  private redirect(): void {
    setTimeout(() => {
      this.router.navigate(['/shop']);
    }, 500);
  }

}
