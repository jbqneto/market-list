import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/firebase/firebase-auth.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  public imgClass: string = 'fade-in';

  public constructor(
    private router: Router, 
    private service: AuthService) {}
  
  public ngOnInit(): void {
    const user = this.service.getUser(); 
    setTimeout(() => {
      this.imgClass = 'fade-out';
      if (user) {
        this.navigate('/shop');
      } else {
        this.navigate('/login');
      }
    }, 3000);
  }

  private navigate(route: string) {
    setTimeout(() => {
      this.router.navigate([route])
    }, 2000);
  }

}
