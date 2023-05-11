import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { PoMenuFilter, PoMenuItemFiltered } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class MenuService {
  private url: string = 'https://po-sample-api.herokuapp.com/v1/menus';

  constructor(private http: HttpClient) {}

  isLogged() {

    console.log(sessionStorage);
    return true; //return !!(sessionStorage.getItem('User')); //Retorna se estão logado.
  }

}
