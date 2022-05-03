import { Component, OnInit } from '@angular/core';
import { PoLanguage } from '@po-ui/ng-components';
import { PoModalPasswordRecoveryType, PoPageLoginLiterals, PoPageLoginRecovery } from '@po-ui/ng-templates';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  literals: PoPageLoginLiterals;


  languages: Array<PoLanguage> = [
    { language: 'pt', description: 'Português' }
  ];

  customLiterals: PoPageLoginLiterals = {
    loginPlaceholder: 'Insira seu usuário de acesso',
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


}
