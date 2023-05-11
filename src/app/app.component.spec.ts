import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ProAppConfigService, ProtheusLibCoreModule } from '@totvs/protheus-lib-core';
import { MenuService } from './app.service';
import { PoDialogService, PoModule} from '@po-ui/ng-components';
import { AuthGuard } from './core/auth/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { PoPageDynamicSearchModule, PoTemplatesModule } from '@po-ui/ng-templates';
import { LoginModule } from './login/login.module';
import { PoCodeEditorModule } from '@po-ui/ng-code-editor';
import { PageDefaultModule } from './pages/configurar/page-default/page-default.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './pages/home/home.module';
import { ConfigurarModule } from './pages/configurar/configurar.module';
import { AuthService } from './login/auth.service';

describe( AppComponent.name, () => {

  let service: MenuService;
  let config: ProAppConfigService;
  let poDialog: PoDialogService;

  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const menuSelect =  { label: 'Felipe Luna' };
  let authGuard: AuthGuard;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [ RouterTestingModule, ProtheusLibCoreModule, BrowserModule,
        CommonModule,
        AppRoutingModule,
        PoModule,
        PoTemplatesModule,
        LoginModule,
        PoPageDynamicSearchModule,
        PoCodeEditorModule,
        HttpClientModule,
        PageDefaultModule,
        HomeModule,
        ConfigurarModule,
      ],
      providers: [ MenuService, AuthGuard, AuthService ],
      declarations: [ AppComponent ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();

    config = TestBed.inject(ProAppConfigService);
    poDialog = TestBed.inject(PoDialogService);
    authGuard = TestBed.inject(AuthGuard);

  });


  it(`${AppComponent.name} - Should Create the app.`, () => {

    authGuard.mostraMenuEmit.emit(true);
    app.ngOnInit();
    expect(app).toBeTruthy();
  });


  it(`${AppComponent.name} - should have as title 'Portal-Nfse.`, () => {

    expect(app.title).toEqual('Portal-Nfse');
  });


  it(`${AppComponent.prototype.dialogConfirm.name} DialogConfirm() - Função pra Fechar rotina PO UI EMBARCADO NO ERP.`,() =>{

    const spy = spyOn(config, 'callAppClose');
    app.dialogConfirm();
    expect(spy).toHaveBeenCalled();
  });


  it(`${AppComponent.prototype.widgetClicadoDocumetacao.name} widgetClicadoDocumetacao() - 'should open the documentation page.`, () => {
    // cria um espião para a função window.open
    const windowOpenSpy = spyOn(window, 'open');

    // chama a função widgetClicadoDocumetacao
    app.widgetClicadoDocumetacao();

    // verifica se a função window.open foi chamada com os parâmetros corretos
    expect(windowOpenSpy).toHaveBeenCalledWith('https://tdn.totvs.com/pages/releaseview.action?pageId=203771195', '_blank');
  });


  it(`${AppComponent.prototype.printMenuAction.name} - Item do Menu Selecionar.`, () =>{
    app.ngOnInit();
    app.printMenuAction(menuSelect);
    expect(app.menuItemSelected).toEqual('Felipe Luna');
  });


  it(`${AppComponent.prototype.dialogAvatarToolbar.name} - Janela Dialog, ao clicar em Sair.`, () =>{
    const poDialogSpy = spyOn(poDialog, 'confirm').and.callFake((params) => {
      params.confirm();
    });
    app.dialogAvatarToolbar();
    expect(poDialogSpy).toHaveBeenCalled();
  });

});
