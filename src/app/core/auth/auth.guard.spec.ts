import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuService } from 'src/app/app.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


describe( AuthGuard.name , () => {
  let guard: AuthGuard;
  let instServiceSpy: jasmine.SpyObj<MenuService>;


  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: MenuService, useValue: jasmine.createSpyObj('MenuService', ['isLogged']) }] // Adiciona o MenuService aos providers
    });

    guard = TestBed.inject(AuthGuard);
    instServiceSpy = TestBed.inject(MenuService) as jasmine.SpyObj<MenuService>;
  });


  it('Should be Created, Service AutGuard', () => {

    expect(guard).toBeTruthy();
  });


  it(`${AuthGuard.prototype.canActivate.name} - Guardião das Rotas de Navegação do Portal New NFS-e.`, () => {
    instServiceSpy.isLogged.and.returnValue(true);
    const route: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
    const state: RouterStateSnapshot = {
      url: '/some-url'
    } as RouterStateSnapshot;
    const result = guard.canActivate( route , state);
    expect(result).toBeTrue();
  });


  it(`${AuthGuard.prototype.canActivate.name} - Guardião das Rotas de Navegação - Entrando no False/Tratando a condição False.`, () => {

    instServiceSpy.isLogged.and.returnValue(false);
    const route: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
    const state: RouterStateSnapshot = {
      url: '/some-url'
    } as RouterStateSnapshot;
    const result = guard.canActivate( route , state);

    expect(result).toBe(false);
  });


});
