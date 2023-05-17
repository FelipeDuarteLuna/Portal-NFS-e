import { PoNotificationService } from '@po-ui/ng-components';
import { TestBed, fakeAsync } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { PageDefaultService } from './page-default.service';
import { IRps } from './rps';
import { of } from 'rxjs';
import { PageDefault } from './PageDefault';



describe(PageDefaultService.name, () => {

  let service: PageDefaultService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const bases : IRps = {   municipio: "Belo Horizonte", cod_mun: "3106200", provedor: "Próprio_2****", versao: "1.00",
    modelo : "ABRASF", xmlTss: "xmltss", xmlPrefeitura: "xmlprefeitura" };
  const jsonPostNewNfse : PageDefault =  {

    DESC_MUN:  "Belo Horizonte",
    COD_MUN:   "3106200",
    UF:        "MG",
    ATIVO:     "S",
    VERSAO:    "1.00",
    PROVEDOR:  "Próprio_2****",
    MODELO:    "ABRASF"
  };


  let config: PoNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [ HttpClientTestingModule ],
      providers: [ PageDefaultService, PoNotificationService ]
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = TestBed.inject(PageDefaultService);
    config = TestBed.inject(PoNotificationService);
  });


  it('Should be Created Service.', () => {
    expect(service).toBeTruthy();
  });


  it(`${PageDefaultService.prototype.showAlertSucess.name}() - PoNotification de Sucesso.`,() =>{
    const PoNotificationSpy = spyOn(config, 'success');
    service.showAlertSucess("Felipe Luna");
    expect(PoNotificationSpy).toHaveBeenCalled();
  });

  it(`${PageDefaultService.prototype.handleError.name}() - PoNotification de ERRO na requisição da API do TSS0013.`,() =>{
    const PoNotificationSpy = spyOn(config, 'error');
    const err: HttpErrorResponse = {
      status: 500, statusText: 'Internal Server Error',
      name: 'HttpErrorResponse',
      message: "Http failure response for http://localhost:1322/rest/api/v1/ApiNewNfse/getmunicipio?filter=3554102: 0 Unknown Error",
      error: undefined,
      ok: false,
      headers: new HttpHeaders,
      url: "http://localhost:1322/rest/api/v1/ApiNewNfse/getmunicipio?filter=3554102",
      type: HttpEventType.ResponseHeader
    };
    service.handleError( err );
    expect(PoNotificationSpy).toHaveBeenCalled();
  });

  it(`${PageDefaultService.prototype.handleError.name}() - PoNotification de ERRO na requisição da API do TSS0013. Err.Status = 500.`,() =>{
    const PoNotificationSpy = spyOn(config, 'error');
    const err: HttpErrorResponse = {
      status: 400, statusText: 'Internal Server Error',
      name: 'HttpErrorResponse',
      message: "Http failure response for http://localhost:1322/rest/api/v1/ApiNewNfse/getmunicipio?filter=3554102: 0 Unknown Error",
      error: undefined,
      ok: false,
      headers: new HttpHeaders,
      url: "http://localhost:1322/rest/api/v1/ApiNewNfse/getmunicipio?filter=3554102",
      type: HttpEventType.ResponseHeader
    };
    service.handleError( err );
    expect(PoNotificationSpy).toHaveBeenCalled();
  });


  it(`${PageDefaultService.prototype.getXmlUnico.name}() - Método "Provedor" deve retornar o xmlUnico para Page Default.`, () => {
    expect(service.getXmlUnico('PROVEDOR')).toEqual('Nome do Provedor da NFS-e, Exemplo:\n(Abaco, Betha, DSFNET, ELOTECH, Fiorilli, Ginfes, IPM, TIPLAN, WebISS etc.)');
  });

  it(`${PageDefaultService.prototype.getXmlUnico.name}() - Método "MODELO" deve retornar o xmlUnico para Page Default.`, () => {
    expect(service.getXmlUnico('MODELO')).toEqual("Nome do Modelo da NFS-e, Exemplo:\n(ABRASF, DSFNET, ELOTECH, Fiorilli,  IPM, etc.)");
  });

  it(`${PageDefaultService.prototype.getXmlUnico.name}() - Método "VERSÃO" deve retornar o xmlUnico para Page Default.`, () => {
    expect(service.getXmlUnico('VERSÃO')).toEqual("Nome do Modelo da NFS-e, Exemplo:\n(1.00, 2.00, 2.1, etc.)");
  });

  it(`${PageDefaultService.prototype.getXmlUnico.name}() - Método "LOTE" deve retornar o xmlUnico para Page Default.`, () => {
    expect(service.getXmlUnico('LOTE')).toEqual(atob("PHJwcyBpZD0icnBzOjE3IiB0c3N2ZXJzYW89IjIuMDAiPg0KCTxhc3NpbmF0dXJhPjU4NjNlY2NjNDQxNmE2MjQ0MTQ1ZWE4ZTE4Y2MxZWNjNTg3ZmQxOGI8L2Fzc2luYXR1cmE+DQoJPGlkZW50aWZpY2FjYW8+DQoJCTxkdGhyZW1pc3Nhbz4yMDIyLTExLTAxVDAwOjA1OjEzPC9kdGhyZW1pc3Nhbz4NCgkJPHNlcmllcnBzPlJQUzwvc2VyaWVycHM+DQoJCTxudW1lcm9ycHM+MTc8L251bWVyb3Jwcz4NCgkJPHRpcG8+MTwvdGlwbz4NCgkJPHNpdHVhY2FvcnBzPjE8L3NpdHVhY2FvcnBzPg0KCQk8dGlwb3JlY29saGU+MTwvdGlwb3JlY29saGU+DQoJCTx0aXBvb3Blcj4xPC90aXBvb3Blcj4NCgkJPHRpcG90cmliPjY8L3RpcG90cmliPg0KCQk8bG9jYWxTZXJ2PjE8L2xvY2FsU2Vydj4NCgk8L2lkZW50aWZpY2FjYW8+DQoJPHByZXN0YWRvcj4NCgkJPGluc2NtdW4+MDAwMTEyMjI8L2luc2NtdW4+DQoJCTxjcGZjbnBqPjAwMTExMzMzMDAwMTIyPC9jcGZjbnBqPg0KCQk8cmF6YW8+UkFaw4NPIFNPQ0lBTCBURVNURSBTL0E8L3JhemFvPg0KCQk8ZmFudGFzaWE+VEVTVEUgUy9BPC9mYW50YXNpYT4NCgkJPGNvZG11bmliZ2U+MzU1MDMwODwvY29kbXVuaWJnZT4NCgkJPGNpZGFkZT5Tw4NPIFBBVUxPPC9jaWRhZGU+DQoJCTx1Zj5TUDwvdWY+DQoJCTxlbWFpbD50ZXN0ZUB0ZXN0ZS5jb20uYnI8L2VtYWlsPg0KCQk8ZGRkPjExPC9kZGQ+DQoJCTx0ZWxlZm9uZT4yMjMzNDQ1NTwvdGVsZWZvbmU+DQoJCTxzaW1wbmFjPjI8L3NpbXBuYWM+DQoJCTxpbmNlbnRjdWx0PjI8L2luY2VudGN1bHQ+DQoJCTxsb2dyYWRvdXJvPkFWIEJSQVogTEVNRTwvbG9ncmFkb3Vybz4NCgkJPG51bWVuZD4xMDAwPC9udW1lbmQ+DQoJCTxjb21wbGVlbmQ+QkxPQ08gQTwvY29tcGxlZW5kPg0KCQk8YmFpcnJvPkpBUkRJTSBTw4NPIEJFTlRPPC9iYWlycm8+DQoJCTx0cGxvZ3JhZG91cm8+MTwvdHBsb2dyYWRvdXJvPg0KCQk8Y2VwPjAyNTE0MDgwPC9jZXA+DQoJPC9wcmVzdGFkb3I+DQoJPHByZXN0YWNhbz4NCgkJPHNlcmllcHJlc3Q+UlBTPC9zZXJpZXByZXN0Pg0KCQk8Y29kbXVuaWJnZT4zNTUwMzA4PC9jb2RtdW5pYmdlPg0KCQk8Y29kbXVuaWJnZWluYz4zNTUwMzA4PC9jb2RtdW5pYmdlaW5jPg0KCQk8bXVuaWNpcGlvPlPDg08gUEFVTE88L211bmljaXBpbz4NCgkJPHVmPlNQPC91Zj4NCgk8L3ByZXN0YWNhbz4NCgk8dG9tYWRvcj4NCgkJPGluc2NtdW4vPg0KCQk8Y3BmY25waj4wMDExMTIyMjAwMDEzMzwvY3BmY25waj4NCgkJPHJhemFvPlRPTUFET1IgUkFaw4NPIFNPQ0lBTCBMVERBPC9yYXphbz4NCgkJPHRpcG9sb2dyPjE8L3RpcG9sb2dyPg0KCQk8bG9ncmFkb3Vybz5BVi4gQVRMw4JOVElDQTwvbG9ncmFkb3Vybz4NCgkJPG51bWVuZD4xNzAyPC9udW1lbmQ+DQoJCTxjb21wbGVuZD5QUkFJQTwvY29tcGxlbmQ+DQoJCTx0aXBvYmFpcnJvPjI8L3RpcG9iYWlycm8+DQoJCTxiYWlycm8+Q09QQUNBQkFOQTwvYmFpcnJvPg0KCQk8Y29kbXVuaWJnZT40MTIwODA0PC9jb2RtdW5pYmdlPg0KCQk8Y2lkYWRlPlFVQVRSTyBCQVJSQVM8L2NpZGFkZT4NCgkJPHVmPlBSPC91Zj4NCgkJPGNlcD44MzQyMDAwMDwvY2VwPg0KCQk8ZW1haWw+dGVzdGVAdGVzdGUuY29tLmJyPC9lbWFpbD4NCgkJPGRkZD4yMTwvZGRkPg0KCQk8dGVsZWZvbmU+MjU0ODcxNzE8L3RlbGVmb25lPg0KCQk8Y29kcGFpcz4xMDU4PC9jb2RwYWlzPg0KCQk8bm9tZXBhaXM+QnJhc2lsPC9ub21lcGFpcz4NCgkJPGVzdHJhbmdlaXJvPjI8L2VzdHJhbmdlaXJvPg0KCQk8bm90aWZpY2F0b21hZG9yPjI8L25vdGlmaWNhdG9tYWRvcj4NCgk8L3RvbWFkb3I+DQoJPHNlcnZpY29zPg0KCQk8c2Vydmljbz4NCgkJCTxjb2RpZ28+MTQuMDE8L2NvZGlnbz4NCgkJCTxhbGlxdW90YT4zLjAwPC9hbGlxdW90YT4NCgkJCTxpZGNuYWUvPg0KCQkJPGNuYWU+NzczOTA5OTwvY25hZT4NCgkJCTxjb2R0cmliPjA1MDg8L2NvZHRyaWI+DQoJCQk8ZGlzY3I+REVTQ1JJw4fDg08gRE8gU0VSVknDh08gLSBIT01PTE9HQcOHw4NPPC9kaXNjcj4NCgkJCTxxdWFudD4xLjAwMDA8L3F1YW50Pg0KCQkJPHZhbHVuaXQ+MS4wMDwvdmFsdW5pdD4NCgkJCTx2YWx0b3RhbD4xLjAwPC92YWx0b3RhbD4NCgkJCTxiYXNlY2FsYz4xLjAwPC9iYXNlY2FsYz4NCgkJCTxpc3NyZXRpZG8+MjwvaXNzcmV0aWRvPg0KCQkJPHZhbGRlZHU+MDwvdmFsZGVkdT4NCgkJCTx2YWxwaXM+MC4wMDwvdmFscGlzPg0KCQkJPHZhbGNvZj4wLjAwPC92YWxjb2Y+DQoJCQk8dmFsaW5zcz4wLjAwPC92YWxpbnNzPg0KCQkJPHZhbGlyPjAuMDA8L3ZhbGlyPg0KCQkJPHZhbGNzbGw+MC4wMDwvdmFsY3NsbD4NCgkJCTx2YWxpc3M+MC4wMzwvdmFsaXNzPg0KCQkJPHZhbGlzc3JldD4wLjAwPC92YWxpc3NyZXQ+DQoJCQk8b3V0cmFzcmV0PjAuMDA8L291dHJhc3JldD4NCgkJCTx2YWxsaXE+MS4wMDwvdmFsbGlxPg0KCQkJPGRlc2Njb25kPjAuMDA8L2Rlc2Njb25kPg0KCQkJPGRlc2NpbmM+MC4wMDwvZGVzY2luYz4NCgkJCTx1bmlkbWVkPlVOPC91bmlkbWVkPg0KCQk8L3NlcnZpY28+DQoJPC9zZXJ2aWNvcz4NCgk8dmFsb3Jlcz4NCgkJPGlzcz4wLjAzPC9pc3M+DQoJCTxpc3NyZXQ+MC4wMDwvaXNzcmV0Pg0KCQk8b3V0cnJldD4wLjAwPC9vdXRycmV0Pg0KCQk8cGlzPjAuMDA8L3Bpcz4NCgkJPGNvZmlucz4wLjAwPC9jb2ZpbnM+DQoJCTxpbnNzPjAuMDA8L2luc3M+DQoJCTxpcj4wLjAwPC9pcj4NCgkJPGNzbGw+MC4wMDwvY3NsbD4NCgkJPGFsaXFpc3M+My4wMDAwPC9hbGlxaXNzPg0KCQk8YWxpcXBpcz4wLjAwMDA8L2FsaXFwaXM+DQoJCTxhbGlxY29mPjAuMDAwMDwvYWxpcWNvZj4NCgkJPGFsaXFpbnNzPjAuMDAwMDwvYWxpcWluc3M+DQoJCTxhbGlxaXI+MC4wMDAwPC9hbGlxaXI+DQoJCTxhbGlxY3NsbD4wLjAwMDA8L2FsaXFjc2xsPg0KCQk8dmFsdG90ZG9jPjEuMDA8L3ZhbHRvdGRvYz4NCgk8L3ZhbG9yZXM+DQoJPGluZmNvbXBsPg0KCQk8ZGVzY3JpY2FvPlRFU1RFIERFIERFU0NSScOHw4NPIENPTVBMRU1FTlRBUjwvZGVzY3JpY2FvPg0KCQk8b2JzZXJ2YWNhbz5URVNURSBERSBPQlNFUlZBw4fDg08gQ09NUExFTUVOVEFSPC9vYnNlcnZhY2FvPg0KCTwvaW5mY29tcGw+DQo8L3Jwcz4="));
  });

  it(`${PageDefaultService.prototype.getXmlUnico.name}() - Método "RPS" deve retornar o xmlUnico para Page Default.`, () => {
    expect(service.getXmlUnico('RPS')).toEqual(atob("PHJwcyBpZD0icnBzOjE3IiB0c3N2ZXJzYW89IjIuMDAiPg0KCTxhc3NpbmF0dXJhPjU4NjNlY2NjNDQxNmE2MjQ0MTQ1ZWE4ZTE4Y2MxZWNjNTg3ZmQxOGI8L2Fzc2luYXR1cmE+DQoJPGlkZW50aWZpY2FjYW8+DQoJCTxkdGhyZW1pc3Nhbz4yMDIyLTExLTAxVDAwOjA1OjEzPC9kdGhyZW1pc3Nhbz4NCgkJPHNlcmllcnBzPlJQUzwvc2VyaWVycHM+DQoJCTxudW1lcm9ycHM+MTc8L251bWVyb3Jwcz4NCgkJPHRpcG8+MTwvdGlwbz4NCgkJPHNpdHVhY2FvcnBzPjE8L3NpdHVhY2FvcnBzPg0KCQk8dGlwb3JlY29saGU+MTwvdGlwb3JlY29saGU+DQoJCTx0aXBvb3Blcj4xPC90aXBvb3Blcj4NCgkJPHRpcG90cmliPjY8L3RpcG90cmliPg0KCQk8bG9jYWxTZXJ2PjE8L2xvY2FsU2Vydj4NCgk8L2lkZW50aWZpY2FjYW8+DQoJPHByZXN0YWRvcj4NCgkJPGluc2NtdW4+MDAwMTEyMjI8L2luc2NtdW4+DQoJCTxjcGZjbnBqPjAwMTExMzMzMDAwMTIyPC9jcGZjbnBqPg0KCQk8cmF6YW8+UkFaw4NPIFNPQ0lBTCBURVNURSBTL0E8L3JhemFvPg0KCQk8ZmFudGFzaWE+VEVTVEUgUy9BPC9mYW50YXNpYT4NCgkJPGNvZG11bmliZ2U+MzU1MDMwODwvY29kbXVuaWJnZT4NCgkJPGNpZGFkZT5Tw4NPIFBBVUxPPC9jaWRhZGU+DQoJCTx1Zj5TUDwvdWY+DQoJCTxlbWFpbD50ZXN0ZUB0ZXN0ZS5jb20uYnI8L2VtYWlsPg0KCQk8ZGRkPjExPC9kZGQ+DQoJCTx0ZWxlZm9uZT4yMjMzNDQ1NTwvdGVsZWZvbmU+DQoJCTxzaW1wbmFjPjI8L3NpbXBuYWM+DQoJCTxpbmNlbnRjdWx0PjI8L2luY2VudGN1bHQ+DQoJCTxsb2dyYWRvdXJvPkFWIEJSQVogTEVNRTwvbG9ncmFkb3Vybz4NCgkJPG51bWVuZD4xMDAwPC9udW1lbmQ+DQoJCTxjb21wbGVlbmQ+QkxPQ08gQTwvY29tcGxlZW5kPg0KCQk8YmFpcnJvPkpBUkRJTSBTw4NPIEJFTlRPPC9iYWlycm8+DQoJCTx0cGxvZ3JhZG91cm8+MTwvdHBsb2dyYWRvdXJvPg0KCQk8Y2VwPjAyNTE0MDgwPC9jZXA+DQoJPC9wcmVzdGFkb3I+DQoJPHByZXN0YWNhbz4NCgkJPHNlcmllcHJlc3Q+UlBTPC9zZXJpZXByZXN0Pg0KCQk8Y29kbXVuaWJnZT4zNTUwMzA4PC9jb2RtdW5pYmdlPg0KCQk8Y29kbXVuaWJnZWluYz4zNTUwMzA4PC9jb2RtdW5pYmdlaW5jPg0KCQk8bXVuaWNpcGlvPlPDg08gUEFVTE88L211bmljaXBpbz4NCgkJPHVmPlNQPC91Zj4NCgk8L3ByZXN0YWNhbz4NCgk8dG9tYWRvcj4NCgkJPGluc2NtdW4vPg0KCQk8Y3BmY25waj4wMDExMTIyMjAwMDEzMzwvY3BmY25waj4NCgkJPHJhemFvPlRPTUFET1IgUkFaw4NPIFNPQ0lBTCBMVERBPC9yYXphbz4NCgkJPHRpcG9sb2dyPjE8L3RpcG9sb2dyPg0KCQk8bG9ncmFkb3Vybz5BVi4gQVRMw4JOVElDQTwvbG9ncmFkb3Vybz4NCgkJPG51bWVuZD4xNzAyPC9udW1lbmQ+DQoJCTxjb21wbGVuZD5QUkFJQTwvY29tcGxlbmQ+DQoJCTx0aXBvYmFpcnJvPjI8L3RpcG9iYWlycm8+DQoJCTxiYWlycm8+Q09QQUNBQkFOQTwvYmFpcnJvPg0KCQk8Y29kbXVuaWJnZT40MTIwODA0PC9jb2RtdW5pYmdlPg0KCQk8Y2lkYWRlPlFVQVRSTyBCQVJSQVM8L2NpZGFkZT4NCgkJPHVmPlBSPC91Zj4NCgkJPGNlcD44MzQyMDAwMDwvY2VwPg0KCQk8ZW1haWw+dGVzdGVAdGVzdGUuY29tLmJyPC9lbWFpbD4NCgkJPGRkZD4yMTwvZGRkPg0KCQk8dGVsZWZvbmU+MjU0ODcxNzE8L3RlbGVmb25lPg0KCQk8Y29kcGFpcz4xMDU4PC9jb2RwYWlzPg0KCQk8bm9tZXBhaXM+QnJhc2lsPC9ub21lcGFpcz4NCgkJPGVzdHJhbmdlaXJvPjI8L2VzdHJhbmdlaXJvPg0KCQk8bm90aWZpY2F0b21hZG9yPjI8L25vdGlmaWNhdG9tYWRvcj4NCgk8L3RvbWFkb3I+DQoJPHNlcnZpY29zPg0KCQk8c2Vydmljbz4NCgkJCTxjb2RpZ28+MTQuMDE8L2NvZGlnbz4NCgkJCTxhbGlxdW90YT4zLjAwPC9hbGlxdW90YT4NCgkJCTxpZGNuYWUvPg0KCQkJPGNuYWU+NzczOTA5OTwvY25hZT4NCgkJCTxjb2R0cmliPjA1MDg8L2NvZHRyaWI+DQoJCQk8ZGlzY3I+REVTQ1JJw4fDg08gRE8gU0VSVknDh08gLSBIT01PTE9HQcOHw4NPPC9kaXNjcj4NCgkJCTxxdWFudD4xLjAwMDA8L3F1YW50Pg0KCQkJPHZhbHVuaXQ+MS4wMDwvdmFsdW5pdD4NCgkJCTx2YWx0b3RhbD4xLjAwPC92YWx0b3RhbD4NCgkJCTxiYXNlY2FsYz4xLjAwPC9iYXNlY2FsYz4NCgkJCTxpc3NyZXRpZG8+MjwvaXNzcmV0aWRvPg0KCQkJPHZhbGRlZHU+MDwvdmFsZGVkdT4NCgkJCTx2YWxwaXM+MC4wMDwvdmFscGlzPg0KCQkJPHZhbGNvZj4wLjAwPC92YWxjb2Y+DQoJCQk8dmFsaW5zcz4wLjAwPC92YWxpbnNzPg0KCQkJPHZhbGlyPjAuMDA8L3ZhbGlyPg0KCQkJPHZhbGNzbGw+MC4wMDwvdmFsY3NsbD4NCgkJCTx2YWxpc3M+MC4wMzwvdmFsaXNzPg0KCQkJPHZhbGlzc3JldD4wLjAwPC92YWxpc3NyZXQ+DQoJCQk8b3V0cmFzcmV0PjAuMDA8L291dHJhc3JldD4NCgkJCTx2YWxsaXE+MS4wMDwvdmFsbGlxPg0KCQkJPGRlc2Njb25kPjAuMDA8L2Rlc2Njb25kPg0KCQkJPGRlc2NpbmM+MC4wMDwvZGVzY2luYz4NCgkJCTx1bmlkbWVkPlVOPC91bmlkbWVkPg0KCQk8L3NlcnZpY28+DQoJPC9zZXJ2aWNvcz4NCgk8dmFsb3Jlcz4NCgkJPGlzcz4wLjAzPC9pc3M+DQoJCTxpc3NyZXQ+MC4wMDwvaXNzcmV0Pg0KCQk8b3V0cnJldD4wLjAwPC9vdXRycmV0Pg0KCQk8cGlzPjAuMDA8L3Bpcz4NCgkJPGNvZmlucz4wLjAwPC9jb2ZpbnM+DQoJCTxpbnNzPjAuMDA8L2luc3M+DQoJCTxpcj4wLjAwPC9pcj4NCgkJPGNzbGw+MC4wMDwvY3NsbD4NCgkJPGFsaXFpc3M+My4wMDAwPC9hbGlxaXNzPg0KCQk8YWxpcXBpcz4wLjAwMDA8L2FsaXFwaXM+DQoJCTxhbGlxY29mPjAuMDAwMDwvYWxpcWNvZj4NCgkJPGFsaXFpbnNzPjAuMDAwMDwvYWxpcWluc3M+DQoJCTxhbGlxaXI+MC4wMDAwPC9hbGlxaXI+DQoJCTxhbGlxY3NsbD4wLjAwMDA8L2FsaXFjc2xsPg0KCQk8dmFsdG90ZG9jPjEuMDA8L3ZhbHRvdGRvYz4NCgk8L3ZhbG9yZXM+DQoJPGluZmNvbXBsPg0KCQk8ZGVzY3JpY2FvPlRFU1RFIERFIERFU0NSScOHw4NPIENPTVBMRU1FTlRBUjwvZGVzY3JpY2FvPg0KCQk8b2JzZXJ2YWNhbz5URVNURSBERSBPQlNFUlZBw4fDg08gQ09NUExFTUVOVEFSPC9vYnNlcnZhY2FvPg0KCTwvaW5mY29tcGw+DQo8L3Jwcz4="));
  });

  it(`${PageDefaultService.prototype.getXmlUnico.name}() - Método "CONSULTA LOTE" deve retornar o xmlUnico para Page Default.`, () => {
    expect(service.getXmlUnico('CONSULTA LOTE')).toEqual(atob("PHNvYXBlbnY6RW52ZWxvcGUgeG1sbnM6c29hcGVudj0iaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvc29hcC9lbnZlbG9wZS8iIHhtbG5zOm5mcz0iaHR0cDovL3dlYnNlcnZpY2VzLnRvdHZzLmNvbS5ici9uZnNlMDAxLmFwdyI+DQogICA8c29hcGVudjpIZWFkZXIvPg0KICAgPHNvYXBlbnY6Qm9keT4NCiAgICAgIDxuZnM6Q09OU0xPVEVORlNFMDAxPg0KICAgICAgICAgPG5mczpVU0VSVE9LRU4+VE9UVlM8L25mczpVU0VSVE9LRU4+DQogICAgICAgICA8bmZzOklEX0VOVD4wMDAwMTc8L25mczpJRF9FTlQ+DQogICAgICAgICA8bmZzOkNPRE1VTj4zMTA2MjAwPC9uZnM6Q09ETVVOPg0KICAgICAgICAgPG5mczpMT1RFPjAwMDAwMDAwMDAwMDM2NDwvbmZzOkxPVEU+DQogICAgICA8L25mczpDT05TTE9URU5GU0UwMDE+DQogICA8L3NvYXBlbnY6Qm9keT4NCjwvc29hcGVudjpFbnZlbG9wZT4="));
  });

  it(`${PageDefaultService.prototype.getXmlUnico.name}() - Método "CONSULTA RPS" deve retornar o xmlUnico para Page Default.`, () => {
    expect(service.getXmlUnico('CONSULTA RPS')).toEqual(atob("PHNvYXBlbnY6RW52ZWxvcGUgeG1sbnM6c29hcGVudj0iaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvc29hcC9lbnZlbG9wZS8iIHhtbG5zOm5mcz0iaHR0cDovL3dlYnNlcnZpY2VzLnRvdHZzLmNvbS5ici9uZnNlMDAxLmFwdyI+DQogICA8c29hcGVudjpIZWFkZXIvPg0KICAgPHNvYXBlbnY6Qm9keT4NCiAgICAgIDxuZnM6VFNTQ09OU1JQU05GU0U+DQogICAgICAgICA8bmZzOlVTRVJUT0tFTj5UT1RWUzwvbmZzOlVTRVJUT0tFTj4NCiAgICAgICAgIDxuZnM6SURfRU5UPjAwMDAxNzwvbmZzOklEX0VOVD4NCiAgICAgICAgIDxuZnM6Q09ETVVOPjMxMDYyMDA8L25mczpDT0RNVU4+DQoJCTxuZnM6VFNTSUQ+UlBTMDAxMTIyPC9uZnM6VFNTSUQ+DQogICAgICAgICA8IS0tT3B0aW9uYWw6LS0+DQogICAgICAgICA8bmZzOk5VTUVST1JQUz48L25mczpOVU1FUk9SUFM+DQogICAgICAgICA8IS0tT3B0aW9uYWw6LS0+DQogICAgICAgICA8bmZzOlNFUklFUlBTPjwvbmZzOlNFUklFUlBTPg0KICAgICAgICAgPCEtLU9wdGlvbmFsOi0tPg0KICAgICAgICAgPG5mczpUSVBPUlBTPjwvbmZzOlRJUE9SUFM+DQogICAgICA8L25mczpUU1NDT05TUlBTTkZTRT4NCiAgIDwvc29hcGVudjpCb2R5Pg0KPC9zb2FwZW52OkVudmVsb3BlPg=="));
  });

  it(`${PageDefaultService.prototype.getXmlUnico.name}() - Método "CANCELAMENTO" deve retornar o xmlUnico para Page Default.`, () => {
    expect(service.getXmlUnico('CANCELAMENTO')).toEqual(atob("PHNvYXBlbnY6RW52ZWxvcGUgeG1sbnM6c29hcGVudj0iaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvc29hcC9lbnZlbG9wZS8iIHhtbG5zOm5mcz0iaHR0cDovL3dlYnNlcnZpY2VzLnRvdHZzLmNvbS5ici9uZnNlMDAxLmFwdyI+DQogICA8c29hcGVudjpIZWFkZXIvPg0KICAgPHNvYXBlbnY6Qm9keT4NCiAgICAgIDxuZnM6Q0FOQ0VMQU5GU0UwMDE+DQogICAgICAgICA8bmZzOlVTRVJUT0tFTj5UT1RWUzwvbmZzOlVTRVJUT0tFTj4NCiAgICAgICAgIDxuZnM6SURfRU5UPjAwMDAxNzwvbmZzOklEX0VOVD4NCiAgICAgICAgIDxuZnM6TkZTRT4NCiAgICAgICAgICAgIDxuZnM6Tk9UQVM+DQogICAgICAgICAgICAgICA8bmZzOk5GU0VTMT4NCiAgICAgICAgICAgICAgICAgIDxuZnM6Q09EQ0FOQz4wMjwvbmZzOkNPRENBTkM+DQogICAgICAgICAgICAgICAgICA8bmZzOkNPRE1VTj4zMTA2MjAwPC9uZnM6Q09ETVVOPg0KICAgICAgICAgICAgICAgICAgPG5mczpJRD5SUFMwMDExMjI8L25mczpJRD4NCiAgICAgICAgICAgICAgICAgIDxuZnM6TkZTRUNBTkNFTEFEQT48L25mczpORlNFQ0FOQ0VMQURBPg0KICAgICAgICAgICAgICAgICAgPG5mczpSRVBST0M+PC9uZnM6UkVQUk9DPg0KICAgICAgICAgICAgICAgICAgPG5mczpSRVBST0NXUz48L25mczpSRVBST0NXUz4NCiAgICAgICAgICAgICAgICAgIDxuZnM6WE1MPjwvbmZzOlhNTD4NCiAgICAgICAgICAgICAgIDwvbmZzOk5GU0VTMT4NCiAgICAgICAgICAgIDwvbmZzOk5PVEFTPg0KICAgICAgICAgPC9uZnM6TkZTRT4NCiAgICAgICAgIDxuZnM6Q09ETVVOPjMxMDYyMDA8L25mczpDT0RNVU4+DQogICAgICA8L25mczpDQU5DRUxBTkZTRTAwMT4NCiAgIDwvc29hcGVudjpCb2R5Pg0KPC9zb2FwZW52OkVudmVsb3BlPg=="));
  });

  it(`${PageDefaultService.prototype.getXmlUnico.name}() - Método "WSDL PRODUÇÃO" deve retornar o xmlUnico para Page Default.`, () => {
    expect(service.getXmlUnico('WSDL PRODUÇÃO')).toEqual("URL do Ambiente de Produção, para Transmissão de NFS-e via\nWeb Service, Exemplo:\n\n( https://nfe.prefeitura.sp.gov.br/ws/lotenfse.asmx )");
  });

  it(`${PageDefaultService.prototype.getXmlUnico.name}() - Método "WSDL HOMOLOGAÇÃO" deve retornar o xmlUnico para Page Default.`, () => {
    expect(service.getXmlUnico('WSDL HOMOLOGAÇÃO')).toEqual("URL do Ambiente de Homologação, para Transmissão de NFS-e via\nWeb Service, Exemplo:\n\n( https://ws.homolog.nfse-cidades.com.br/ws/itj )");
  });

  it(`${PageDefaultService.prototype.getXmlUnico.name}() - Método "SIGN LOTE" deve retornar o xmlUnico para Page Default.`, () => {
    expect(service.getXmlUnico('SIGN LOTE')).toEqual("Caso prefeitura requerer assinatura do .XML Lote, informar a\ntag a ser assinada.\nExemplo: LoteRps");
  });

  it(`${PageDefaultService.prototype.getXmlUnico.name}() - Método "SIGN RPS" deve retornar o xmlUnico para Page Default.`, () => {
    expect(service.getXmlUnico('SIGN RPS')).toEqual("Caso prefeitura requerer assinatura do .XML RPS, informar a\ntag a ser assinada.\nExemplo: InfDeclaracaoPrestacaoServico");
  });

  it(`${PageDefaultService.prototype.getXmlUnico.name}() - Método "SIGN CANC" deve retornar o xmlUnico para Page Default.`, () => {
    expect(service.getXmlUnico('SIGN CANC')).toEqual("Caso prefeitura requerer assinatura do .XML Cancelamento, informar a\ntag a ser assinada.\nExemplo: InfPedidoCancelamento ");
  });

  it(`${PageDefaultService.prototype.getXmlUnico.name}() - Método "SIGN CONS" deve retornar o xmlUnico para Page Default.`, () => {
    expect(service.getXmlUnico('SIGN CONS')).toEqual("Caso prefeitura requerer assinatura do .XML Consulta Lote, informar a\ntag a ser assinada.\nExemplo: Pedido ");
  });

  it(`${PageDefaultService.prototype.getXmlUnico.name}() - Método "DE PARA" deve retornar o xmlUnico para Page Default.`, () => {
    expect(service.getXmlUnico('DE PARA')).toEqual(atob("ew0KICAgICJpdGVtcyI6IFt7DQogICAgICAgICAgICAiaWRfcGF0aCI6ICJbNVtpZGVudGlmaWNhY2FvOnRpcG90cmliXTVdIiwNCiAgICAgICAgICAgICJjb25kaWNpb25haXMiOiBbew0KICAgICAgICAgICAgICAgICAgICAiMSI6IHsNCiAgICAgICAgICAgICAgICAgICAgICAgICJmb3JtdWxhIjogImFsbHRyaW0oY0NvbnRldWRvKSA9PSAnNiciLA0KICAgICAgICAgICAgICAgICAgICAgICAgInJldHVybiI6ICIxIg0KICAgICAgICAgICAgICAgICAgICB9LA0KICAgICAgICAgICAgICAgICAgICAiMiI6IHsNCiAgICAgICAgICAgICAgICAgICAgICAgICJmb3JtdWxhIjogImFsbHRyaW0oY0NvbnRldWRvKSA9PSAnMiciLA0KICAgICAgICAgICAgICAgICAgICAgICAgInJldHVybiI6ICIyIg0KICAgICAgICAgICAgICAgICAgICB9LA0KICAgICAgICAgICAgICAgICAgICAiMyI6IHsNCiAgICAgICAgICAgICAgICAgICAgICAgICJmb3JtdWxhIjogImFsbHRyaW0oY0NvbnRldWRvKSA9PSAnMSciLA0KICAgICAgICAgICAgICAgICAgICAgICAgInJldHVybiI6ICIzIg0KICAgICAgICAgICAgICAgICAgICB9LA0KICAgICAgICAgICAgICAgICAgICAiNCI6IHsNCiAgICAgICAgICAgICAgICAgICAgICAgICJmb3JtdWxhIjogImFsbHRyaW0oY0NvbnRldWRvKSA9PSAnMyciLA0KICAgICAgICAgICAgICAgICAgICAgICAgInJldHVybiI6ICI0Ig0KICAgICAgICAgICAgICAgICAgICB9LA0KICAgICAgICAgICAgICAgICAgICAiNSI6IHsNCiAgICAgICAgICAgICAgICAgICAgICAgICJmb3JtdWxhIjogImFsbHRyaW0oY0NvbnRldWRvKSA9PSAnNCciLA0KICAgICAgICAgICAgICAgICAgICAgICAgInJldHVybiI6ICI1Ig0KICAgICAgICAgICAgICAgICAgICB9LA0KICAgICAgICAgICAgICAgICAgICAiNiI6IHsNCiAgICAgICAgICAgICAgICAgICAgICAgICJmb3JtdWxhIjogImFsbHRyaW0oY0NvbnRldWRvKSA9PSAnNSciLA0KICAgICAgICAgICAgICAgICAgICAgICAgInJldHVybiI6ICI3Ig0KICAgICAgICAgICAgICAgICAgICB9LA0KICAgICAgICAgICAgICAgICAgICAiNyI6IHsNCiAgICAgICAgICAgICAgICAgICAgICAgICJmb3JtdWxhIjogImFsbHRyaW0oY0NvbnRldWRvKSA9PSAnMTInIiwNCiAgICAgICAgICAgICAgICAgICAgICAgICJyZXR1cm4iOiAiNiINCiAgICAgICAgICAgICAgICAgICAgfSwNCiAgICAgICAgICAgICAgICAgICAgIjgiOiB7DQogICAgICAgICAgICAgICAgICAgICAgICAiZm9ybXVsYSI6ICIuVC4iLA0KICAgICAgICAgICAgICAgICAgICAgICAgInJldHVybiI6ICI5OSINCiAgICAgICAgICAgICAgICAgICAgfQ0KICAgICAgICAgICAgICAgIH0NCiAgICAgICAgICAgIF0NCiAgICAgICAgfSwgew0KICAgICAgICAgICAgImlkX3BhdGgiOiAiWzQ2W3RvbWFkb3JdNDZdIiwNCiAgICAgICAgICAgICJjb25kaWNpb25haXMiOiBbew0KICAgICAgICAgICAgICAgICAgICAiMSI6IHsNCiAgICAgICAgICAgICAgICAgICAgICAgICJmb3JtdWxhIjogInR5cGUoJ29YbWxVbmljbzpfcnBzOl90b21hZG9yOl9kZGQnKTw+J1UnIC5hbmQuIHR5cGUoJ29YbWxVbmljbzpfcnBzOl90b21hZG9yOl90ZWxlZm9uZScpPD4nVSciLA0KICAgICAgICAgICAgICAgICAgICAgICAgImV4ZWMiOiAic3Vic3RyKG9YbWxVbmljbzpfcnBzOl90b21hZG9yOl9kZGQ6dGV4dCArIG9YbWxVbmljbzpfcnBzOl90b21hZG9yOl90ZWxlZm9uZTp0ZXh0LDEsMTEpIg0KICAgICAgICAgICAgICAgICAgICB9DQogICAgICAgICAgICAgICAgfQ0KICAgICAgICAgICAgXQ0KICAgICAgICB9LCB7DQogICAgICAgICAgICAiU1BFRDA1MSI6IHsNCiAgICAgICAgICAgICAgICAiUlBTIjogew0KICAgICAgICAgICAgICAgICAgICAiZm9ybXVsYSI6ICJUeXBlKCdvWG1sRGVzdDpfSU5GUlBTOl9JREVOVElGSUNBQ0FPUlBTOl9OVU1FUk8nKTw+J1UnIiwNCiAgICAgICAgICAgICAgICAgICAgImV4ZWMiOiAib1htbERlc3Q6X0lORlJQUzpfSURFTlRJRklDQUNBT1JQUzpfTlVNRVJPOlRFWFQiDQogICAgICAgICAgICAgICAgfSwNCiAgICAgICAgICAgICAgICAiU0VSSUVfUlBTIjogew0KICAgICAgICAgICAgICAgICAgICAiZm9ybXVsYSI6ICJUeXBlKCdvWG1sRGVzdDpfSU5GUlBTOl9JREVOVElGSUNBQ0FPUlBTOl9TRVJJRScpPD4nVSciLA0KICAgICAgICAgICAgICAgICAgICAiZXhlYyI6ICJTdWJTdHIoQWxsdHJpbShvWG1sRGVzdDpfSU5GUlBTOl9JREVOVElGSUNBQ0FPUlBTOl9TRVJJRTpURVhUKSwxLDUpIg0KICAgICAgICAgICAgICAgIH0sDQogICAgICAgICAgICAgICAgIlRJUE9fUlBTIjogew0KICAgICAgICAgICAgICAgICAgICAiZm9ybXVsYSI6ICJUeXBlKCdvWG1sRGVzdDpfSU5GUlBTOl9JREVOVElGSUNBQ0FPUlBTOl9USVBPJyk8PidVJyIsDQogICAgICAgICAgICAgICAgICAgICJleGVjIjogIkFsbHRyaW0ob1htbERlc3Q6X0lORlJQUzpfSURFTlRJRklDQUNBT1JQUzpfVElQTzpURVhUKSINCiAgICAgICAgICAgICAgICB9LA0KICAgICAgICAgICAgICAgICJDTlBKREVTVCI6IHsNCiAgICAgICAgICAgICAgICAgICAgImZvcm11bGEiOiAiVHlwZSgnb1htbERlc3Q6X0lORlJQUzpfVE9NQURPUjpfSURFTlRJRklDQUNBT1RPTUFET1I6X0NQRkNOUEo6X0NOUEonKTw+J1UnIiwNCiAgICAgICAgICAgICAgICAgICAgImV4ZWMiOiAiQWxsdHJpbShvWG1sRGVzdDpfSU5GUlBTOl9UT01BRE9SOl9JREVOVElGSUNBQ0FPVE9NQURPUjpfQ1BGQ05QSjpfQ05QSjpURVhUKSINCiAgICAgICAgICAgICAgICB9LA0KICAgICAgICAgICAgICAgICJEQVRFX0VNSVMiOiB7DQogICAgICAgICAgICAgICAgICAgICJmb3JtdWxhIjogIlR5cGUoJ29YbWxEZXN0Ol9JTkZSUFM6X0RBVEFFTUlTU0FPJyk8PidVJyIsDQogICAgICAgICAgICAgICAgICAgICJleGVjIjogInN0clRyYW4oc3ViU3RyKG9YbWxEZXN0Ol9JTkZSUFM6X0RBVEFFTUlTU0FPOlRFWFQsMSwxMCksJy0nLCcnKSINCiAgICAgICAgICAgICAgICB9LA0KICAgICAgICAgICAgICAgICJUSU1FX0VNSVMiOiB7DQogICAgICAgICAgICAgICAgICAgICJmb3JtdWxhIjogIlR5cGUoJ29YbWxEZXN0Ol9JTkZSUFM6X0RBVEFFTUlTU0FPJyk8PidVJyIsDQogICAgICAgICAgICAgICAgICAgICJleGVjIjogInN1YlN0cihvWG1sRGVzdDpfSU5GUlBTOl9EQVRBRU1JU1NBTzpURVhULDEyLDgpIg0KICAgICAgICAgICAgICAgIH0NCiAgICAgICAgICAgIH0NCiAgICAgICAgfSwgew0KICAgICAgICAgICAgIl9fR0VUSURDSEFWRSI6IHsNCiAgICAgICAgICAgICAgICAiZXhlYyI6ICInTlNlJytnZXRVRkNvZGUoU1BFRDAwMS0+VUYpK1N1YlN0cihvWG1sVW5pY286X3JwczpfaWRlbnRpZmljYWNhbzpfZHRocmVtaXNzYW86VEVYVCwzLDIpK1N1YlN0cihvWG1sVW5pY286X3JwczpfaWRlbnRpZmljYWNhbzpfZHRocmVtaXNzYW86VEVYVCw2LDIpK0FsbHRyaW0oU1BFRDAwMS0+Q05QSikrJzU2JytTdHJaZXJvKFZhbChTdWJTdHIob1htbFVuaWNvOl9ycHM6X2lkZW50aWZpY2FjYW86X3NlcmllcnBzOlRFWFQsMSwzKSksMykrU3RyWmVybyhWYWwoU3ViU3RyKG9YbWxVbmljbzpfcnBzOl9pZGVudGlmaWNhY2FvOl9udW1lcm9ycHM6VEVYVCwxLDkpKSw5KStTdHJaZXJvKFZhbChTdWJTdHIob1htbFVuaWNvOl9ycHM6X2lkZW50aWZpY2FjYW86X251bWVyb3JwczpURVhULDEsOSkpLDkpIg0KICAgICAgICAgICAgfQ0KICAgICAgICB9DQogICAgXQ0KfQ=="));
  });

  it(`${PageDefaultService.prototype.list.name}() - Retorno .Json dos municipíos da TSS0013, completo.`,  fakeAsync(() => {
    httpClientSpy.get.and.returnValue(of(bases));

    service.list().subscribe({
      next: response => {
        expect(response)
          .toEqual(bases); }});
  }));

  it(`${PageDefaultService.prototype.list.name}() - Retorno .Json dos municipíos da TSS0013, completo.`,  fakeAsync(() => {
    httpClientSpy.get.and.returnValue(of(bases));

    service.GetRenans2Lucia().subscribe({
      next: response => {
        expect(response)
          .toEqual(bases); }});
  }));

  it(`${PageDefaultService.prototype.list.name}() - Realiza a Gravação do Conteudo editado na Page Default na Tabela TSS0013.Json dos municipíos da TSS0013.`,  fakeAsync(() => {
    httpClientSpy.post.and.returnValue(of(jsonPostNewNfse));

    service.post(jsonPostNewNfse).subscribe({
      next: response => {
        expect(response)
          .toEqual(bases); }});
  }));

});


