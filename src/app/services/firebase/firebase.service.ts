import { Injectable } from "@angular/core";
import { AppService } from "../app.service";
import { environment } from 'src/environments/environment.development';

@Injectable()
export class FireBaseService implements AppService {
  private url: string = environment.databaseUrl;

}