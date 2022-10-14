import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  isLogged() {
    console.log(sessionStorage);
    return !!(sessionStorage.getItem('User')); //Retorna se estão logado.
  }

}
