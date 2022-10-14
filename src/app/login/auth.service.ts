import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  mostraMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  checkLogin(event){
    console.log("nickDev2022");
    console.log(event);

    if (event.login.toUpperCase() == "ADMIN" && event.password == "123456" ) {
      console.log("nickDev2022");

      this.mostraMenuEmitter.emit(true);

      sessionStorage.setItem('User', event.login.toUpperCase());
      sessionStorage.setItem('Password', event.password);
      this.router.navigate(['home']);
    } else {
      console.log("Usário não autorizado, verifique as informações");
      this.mostraMenuEmitter.emit(false);
    }
  }

}
