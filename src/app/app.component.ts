import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/firebase/firebase-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public constructor(private authService: AuthService) {}

  public ngOnInit(): void {
  
    this.authService.onAuthenticate().subscribe(user => {
      console.log(user);
    });

  }

}
