import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ProtheusLibCoreModule } from '@totvs/protheus-lib-core';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { HomeRoutingModule } from './home-routing.module';

describe(HomeComponent.name, () => {

  let app: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const menuSelect = { label: 'Felipe Luna'};

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [RouterTestingModule, ProtheusLibCoreModule,     PoModule,
        RouterModule,
        PoTemplatesModule,
        HomeRoutingModule],
      declarations: [ HomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('Should Create Component', () => {
    app.ngOnInit();
    expect(app).toBeTruthy();
  });


  it(`${HomeComponent.prototype.widgetClicadoDocumetacao.name} - 'should open the documentation page.`, () => {
    // cria um espião para a função window.open
    const windowOpenSpy = spyOn(window, 'open');

    // chama a função widgetClicadoDocumetacao
    app.widgetClicadoDocumetacao();

    // verifica se a função window.open foi chamada com os parâmetros corretos
    expect(windowOpenSpy).toHaveBeenCalledWith('https://tdn.totvs.com/pages/releaseview.action?pageId=203771195', '_blank');
  });


  it(`${HomeComponent.prototype.printMenuAction.name} - Item do Menu Selecionar.`, () =>{
      app.ngOnInit();
      app.printMenuAction(menuSelect);
      expect(app.menuItemSelected).toEqual('Felipe Luna');
  });

});
