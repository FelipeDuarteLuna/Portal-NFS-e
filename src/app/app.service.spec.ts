import { TestBed } from '@angular/core/testing';

import { MenuService } from './app.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';



describe('MenuService', () => {
  let service: MenuService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:  [HttpClientTestingModule],
      providers: [ MenuService ]
    });
    service = TestBed.inject(MenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Testing isLogged() function ', () => {
     const lReturn = service.isLogged();
     console.log(lReturn);
     expect( lReturn ).toBeTruthy();
  });

});
