import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { ProtheusLibCoreModule } from '@totvs/protheus-lib-core';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PoFieldModule, PoMenuItem, PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { PageDefaultComponent } from './page-default.component';
import { FormsModule } from '@angular/forms';
import { PoCodeEditorModule } from '@po-ui/ng-code-editor';
import { PageDefaultService } from './page-default.service';
import { of } from 'rxjs';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';


describe(PageDefaultComponent.name, () => {

  let app: PageDefaultComponent;
  let fixture: ComponentFixture<PageDefaultComponent>;

  let router: any;
  const localStorageData = {
    Municipio: 'Belo Horizonte',
    UF: 'MG',
    codMunicipio: '3106200',
    Versao: '1.0',
    Provedor: 'bhiss',
    metodo: 'Modelo',
    conteudoXml: 'abrasf'
  };
  let location: Location;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['getCurrentNavigation']);
    router.getCurrentNavigation.and.returnValue({
      extras: {
        state: {
          Municipio: "Belo Horizonte",
          UF: "MG",
          codMunicipio: "3106200",
          Versao: '1.0',
          Provedor: "bhiss",
          metodo: "Modelo",
          conteudoXml: "abrasf"
        }
      }});

    await TestBed.configureTestingModule({

      imports: [RouterTestingModule, ProtheusLibCoreModule,     PoModule,
        RouterModule, PoTemplatesModule,   PoTemplatesModule,
        PoFieldModule, FormsModule, PoCodeEditorModule],
      providers: [  PageDefaultService,{ provide: Router, useValue: router },
        { provide: ActivatedRoute,  useValue: {
          params: of({ id: 'Provedor' }) // aqui simulamos que o parâmetro id é 123
        } },
        { provide: Location, useValue: { back: jasmine.createSpy('back') } }, ],
      declarations: [ PageDefaultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDefaultComponent);
    app = fixture.componentInstance;
    location = TestBed.inject(Location);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    fixture.detectChanges();

  });

  it( `${PageDefaultComponent.name} - Should Create Component.`, () => {

    expect(app).toBeTruthy();
  });

  it(`${PageDefaultComponent.prototype.printMenuAction.name}() - Item do Menu Selecionar.`, () =>{

    const menuSelect : PoMenuItem =  { label: 'Felipe Luna' };
    app.printMenuAction(menuSelect);
    expect(app.menuItemSelected).toEqual('Felipe Luna');
  });


  it(`${PageDefaultComponent.prototype.ToEdit.name}() - Item do Menu Selecionar.`, () =>{

    app.ToEdit();
    expect(app.editar).toBeFalsy();
  });

  it(`${PageDefaultComponent.prototype.onDownloadXML.name}() - Download dos dados do Municipios Carregado na PO Table da Page Configurar.`, () =>{

    const windowUrlnSpy = spyOn(window.URL, 'revokeObjectURL');
    app.onDownloadXML();
    expect(windowUrlnSpy).toHaveBeenCalled();
  });

  it(`${PageDefaultComponent.prototype.onDownloadXML.name}() - Rota de navegação para Pagina anterior, Page Configurar.`, () => {

    app.onBack();
    expect(location.back).toHaveBeenCalled();
  });

  it(`${PageDefaultComponent.prototype.ToSave.name}() - Post para gravação da Tabela TSS0013 do TSS. COM SUCESSO`,() => {
    const success = {code: "200", name: "OK", Descricao: "O recurso solicitado foi processado e retornado com sucesso."};
    //httpClientSpy.post.and.returnValue(of( success ));
    let pagedeFaultApieSpy = fixture.debugElement.injector.get(PageDefaultService);
    spyOn(pagedeFaultApieSpy, 'post').and.callFake(() => {
      return of(success);
    })

    const postApi = { ATIVO: "S", COD_MUN: "3106200", DESC_MUN: "QmVsbyBIb3Jpem9udGU=", PROVEDOR: "bhiss", UF: "MG", VERSAO: "1.00", XML_TSS: "Tm9tZSBkbyBQcm92ZWRvciBkYSBORlMtZSwgRXhlbXBsbzoKKEFiYWNvLCBCZXRoYSwgRFNGTkVULCBFTE9URUNILCBGaW9yaWxsaSwgR2luZmVzLCBJUE0sIFRJUExBTiwgV2ViSVNTIGV0Yy4p" };
    app.ToSave(postApi);

    app.nomeMetodo = "PROVEDOR";
    app.ToSave(postApi);

    app.nomeMetodo = "VERSÃO";
    app.ToSave(postApi);

    app.nomeMetodo = "LOTE";
    app.ToSave(postApi);

    app.nomeMetodo = "RPS";
    app.ToSave(postApi);

    app.nomeMetodo = "CONSULTA LOTE";
    app.ToSave(postApi);

    app.nomeMetodo = "CONSULTA RPS";
    app.ToSave(postApi);

    app.nomeMetodo = "CANCELAMENTO";
    app.ToSave(postApi);

    app.nomeMetodo = "WSDL PRODUÇÃO";
    app.ToSave(postApi);

    app.nomeMetodo = "WSDL HOMOLOGAÇÃO";
    app.ToSave(postApi);

    app.nomeMetodo = "SIGN LOTE";
    app.ToSave(postApi);

    app.nomeMetodo = "SIGN RPS";
    app.ToSave(postApi);

    app.nomeMetodo = "SIGN CANC";
    app.ToSave(postApi);

    app.nomeMetodo = "SIGN CONS";
    app.ToSave(postApi);

    app.nomeMetodo = "DE PARA";
    app.ToSave(postApi);

    expect(sessionStorage.getItem('CodMunIBGE')).toBe(app.codMunicipio);
  });

});
