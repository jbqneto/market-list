import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { AppService } from 'src/app/services/app.service';
import { FireBaseService } from 'src/app/services/firebase/firebase.service';

type ListItem = {
  id: string;
  name: string;
}

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
  items: ListItem[] = [];
  private animation: AnimationItem | null = null;

  public animationOptions: AnimationOptions = {
    path: 'https://assets9.lottiefiles.com/packages/lf20_jigbsmll.json',
    autoplay: false,
    loop: false,
  };

  public constructor(private service: AppService) {

  }

  public ngOnInit(): void {
    this.service.listItems().subscribe((_items) => {
      if (_items) {
        this.items = Object.entries(_items).map((item) => ({
          id: item[0],
          name: item[1]
        }));
      } else {
        this.items = [];
      }
    });
  }
  
  public animationCreated(animation: AnimationItem): void {
    this.animation = animation;
  }

  public addItem() {
    const item = this.item.toLocaleLowerCase();
    this.item = '';

    const exists = this.items.some((_item) => _item.name === item);

    if (!exists) {
      if (this.animation) {
        this.playAnimation();
      }
      this.service.addItem(item);
    } else {
      alert(`'${item}' already exists in your list!`);
    }
  }

  public deleteItem(id: string): void {
    this.service.remove(id).subscribe(() => this.playAnimation())
  }

  private playAnimation() {
    if (this.animation) {
      this.animation.play();
      setTimeout(() => {
        this.animation?.stop();
      }, 3000);
    }
  }

}
