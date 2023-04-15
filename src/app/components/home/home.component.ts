import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public animationOptions: AnimationOptions = {
    path: 'https://assets9.lottiefiles.com/packages/lf20_jigbsmll.json',
    autoplay: false,
  };

}
