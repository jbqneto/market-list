import { Component, Input } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user';
import { AppService } from 'src/app/services/app.service';
import { FirebaseHelper } from 'src/app/services/firebase/firebase-config';
import { FireBaseService } from 'src/app/services/firebase/firebase.service';

type ListItem = {
  id: string;
  name: string;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent {
  private service: AppService;
  private _user: User | null = null;

  public item: string = '';
  public items: ListItem[] = [];
  private animation: AnimationItem | null = null;

  @Input()
  public set user(user: User | null) {
    if (user) {
      this._user = user;
      this.listItems(user.id);
    }
  }

  public constructor() {
    this.service = new FireBaseService();
  }

  public animationOptions: AnimationOptions = {
    path: 'https://assets9.lottiefiles.com/packages/lf20_jigbsmll.json',
    autoplay: false,
    loop: false,
  };

  public ngOnInit(): void {
    
  }

  private listItems(userId: string): void {
    console.log(userId);
    this.service.listItems(userId).subscribe((_items) => {
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
    const user = this.getUser();
    this.item = '';


    const exists = this.items.some((_item) => _item.name === item);

    if (!exists) {
      if (this.animation) {
        this.playAnimation();
      }
      this.service?.addItem(user.id, item);
    } else {
      alert(`'${item}' já foi cadastrado anteriormente!`);
    }
  }

  public deleteItem(id: string): void {
    this.service.remove(this.getUser().id, id).subscribe(() => this.playAnimation())
  }

  private getUser(): User {
    if (!this._user)
      throw new Error('User not set');

    return this._user;
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
