import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'food-list-pwa';

  public constructor() {
    console.log('Are we running on production ? ' + environment.production);
    console.log(environment.databaseUrl)
  }

}
