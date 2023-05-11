import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/firebase/firebase-auth.service';
import { StorageService } from 'src/app/services/storage-service';

@Component({
  selector: 'app-logout',
  template: '<p></p>'
})
export class LogoutComponent implements OnInit {

  public constructor(private service: AuthService, private router: Router) {}

  public ngOnInit(): void {
    this.service.logout();
    this.router.navigate(['/login'])
  }
}
