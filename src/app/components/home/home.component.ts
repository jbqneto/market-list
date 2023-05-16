import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/firebase/firebase-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public user: User | null = null;
 
  public constructor(private service: AuthService) {

  }

  public ngOnInit(): void {
    this.user = this.service.getUser();
  }

}
