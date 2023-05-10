/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';

describe(LoginComponent.name, () => {

  let app: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AuthService;
  const eventTrue =
  {
    "login": "ADMIN",
    "password": "123456"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [ RouterTestingModule ],
      providers: [ AuthService ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.inject(AuthService);

  });


  it(`${LoginComponent.prototype.goToLogin.name} - should create the app.` , () => {
    expect(app).toBeTruthy();
  });

  it(`${LoginComponent.prototype.goToLogin.name} GoToLogin() - Função pra validar Login.`,() =>{

    const spy = spyOn(service, 'checkLogin');
    app.goToLogin(eventTrue);
    expect(spy).toHaveBeenCalled();
  });


});
