import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  mostraMenuEmitter = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private PoNotificationService: PoNotificationService,
  ) { }

  checkLogin(event){
    console.log("nickDev2022");
    console.log(event);

    if (event.login.toUpperCase() == "ADMIN" && event.password == "123456" ) {
      console.log("nickDev2022");

      this.mostraMenuEmitter.emit(true);

      sessionStorage.setItem('User', event.login.toUpperCase());
      sessionStorage.setItem('Password', event.password);
      this.router.navigate(['/home']);
    } else {
      this.mostraMenuEmitter.emit(false);
      this.PoNotificationService.error("Usuário incorreto, verifique as informações!");
    }
  }
}
