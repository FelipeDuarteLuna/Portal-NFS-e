import { TestBed } from '@angular/core/testing';
import { MenuService } from './app.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe(MenuService.name, () => {

  let service: MenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports:  [HttpClientTestingModule],
      providers: [ MenuService ]
    });

    service = TestBed.inject(MenuService);

  });

  it(`${MenuService.name}() - Should be Created. `, () => {
    expect(service).toBeTruthy();
  });

  it(`${MenuService.prototype.isLogged.name}() - Verificando se o usuário está logado. `, () => {
     const lReturn = service.isLogged();
     console.log(lReturn);
     expect( lReturn ).toBeTrue();
  });

});
