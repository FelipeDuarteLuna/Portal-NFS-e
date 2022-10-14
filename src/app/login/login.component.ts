import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoLanguage } from '@po-ui/ng-components';
import { PoModalPasswordRecoveryType, PoPageLoginLiterals, PoPageLoginRecovery } from '@po-ui/ng-templates';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   private userLogin: string;
   private userPass: string;

  constructor(
    private router: Router,
    private authservice : AuthService,
  ) { }

  ngOnInit() {
  }

  literals: PoPageLoginLiterals;


  languages: Array<PoLanguage> = [
    { language: 'pt', description: 'Portugu�s' }
  ];

  customLiterals: PoPageLoginLiterals = {
    loginPlaceholder: 'Insira seu usu�rio de acesso',
    passwordPlaceholder: 'Insira sua senha de acesso',
    submitLabel: 'Acessar sistema',
    forgotPassword: 'Esqueceu sua senha?',
    forgotYourPassword: 'Esqueceu sua senha?',
    highlightInfo: '',
    iForgotMyPassword: 'Esqueci minha senha',
  };

  passwordRecovery: PoPageLoginRecovery = {
    url: 'https://po-sample-api.herokuapp.com/v1/users',
    type: PoModalPasswordRecoveryType.All,
    contactMail: 'support@mail.com'
  };

  user: string = '' ;

  goToLogin(event){
    this.authservice.checkLogin(event);
    /*console.log("nickDev2022");
    console.log(event);

    if (event.login.toUpperCase() == "ADMIN" && event.password == "1" ) {
      console.log("nickDev2022");
      this.router.navigate(['home']);
    } else {
      console.log("Us�rio n�o autorizado, verifique as informa��es");
    }*/
  }

}
