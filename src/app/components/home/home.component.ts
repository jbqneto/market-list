import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AppService } from 'src/app/services/app.service';
import { FireBaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    { provide: AppService, useClass: FireBaseService }
  ]
})
export class HomeComponent implements OnInit {
  public item: string = '';
  items: string[] = [];

  public animationOptions: AnimationOptions = {
    path: 'https://assets9.lottiefiles.com/packages/lf20_jigbsmll.json',
    autoplay: false,
  };

  public constructor(private service: AppService) {

  }

  public ngOnInit(): void {
    this.service.listItems().subscribe((items) => console.log(items));
  }


  public addItem() {
    this.service.addItem(this.item);
  }

}
