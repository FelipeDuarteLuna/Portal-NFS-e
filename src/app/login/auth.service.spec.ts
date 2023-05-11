import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { from } from 'rxjs';
import { AppRoutingModule } from '../app-routing.module';
import { PoNotificationService } from '@po-ui/ng-components';

describe( AuthService.name, () => {

  let service: AuthService;
  let config: PoNotificationService;
  const eventTrue =
    {
      "login": "ADMIN",
      "password": "123456"
    };

  const eventFalse =
    {
      "login": "LUNA",
      "password": "123456"
    };

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports:  [RouterTestingModule, AppRoutingModule ]
    });

    service = TestBed.inject(AuthService);
    config = TestBed.inject(PoNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`${ AuthService.prototype.checkLogin.name} - Validação do Login e Senha para entrar no Portal New NFS-e.`, () =>{

    //const spy = spyOn(service, 'mostraMenuEmitter');
    service.checkLogin(eventTrue);


    expect(sessionStorage.getItem("User")).toEqual("ADMIN");
  });

  it(`${ AuthService.prototype.checkLogin.name} - Validação do Login e Senha para entrar Else.`, () =>{

    const PoNotificationSpy = spyOn(config, 'error');
    service.checkLogin(eventFalse);

    expect(PoNotificationSpy).toHaveBeenCalled();
    //expect(sessionStorage.getItem("User")).toEqual("");
  });

});
