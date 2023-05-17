import { PoNotification, PoNotificationService } from '@po-ui/ng-components';
import { TestBed, fakeAsync } from '@angular/core/testing';

import { ConfigurarApi } from './configurar.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { MunGet, MunIbge } from './configurar';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';


describe(ConfigurarApi.name, () => {

  let service: ConfigurarApi;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const bases : MunIbge = {  length: 3528502, id:"3528502", nome:"Mairiporã",  microrregiao:"", regiaoimediata:"" };
  let config: PoNotificationService;
  let jsonTSSNewNFse: MunGet = {
    Descricao: "string",
    name: "Belo Horizonte",
    code: "3106200",
    DESC_MUN:  "QmVsbyBIb3Jpem9udGU=",
    VERSAO:    "1.00",
    UF:        "MG",
    PROVEDOR:  'bhiss',
    MODELO:    'abrasf',
    XML_LOTE:  "ICA8RW52aWFyTG90ZVJwc0VudmlvIHhtbG5zPSJodHRwOi8vd3d3LmFicmFzZi5vcmcuYnIvbmZzZS54c2QiPg0KICAgIDxMb3RlUnBzIHhtbG5zPSJodHRwOi8vd3d3LmFicmFzZi5vcmcuYnIvbmZzZS54c2QiIElkPSJbMVthbGx0cmltKF9vTmZzZTpjTG90ZSldMV0iIHZlcnNhbz0iMS4wMCI+DQogICAgICA8TnVtZXJvTG90ZT5bMlthbGx0cmltKF9vTmZzZTpjTG90ZSldMl08L051bWVyb0xvdGU+DQogICAgICA8Q25waj5bM1thbGx0cmltKFNQRUQwMDEtPkNOUEopXTNdPC9DbnBqPg0KICAgICAgPEluc2NyaWNhb011bmljaXBhbD5bNFthbGx0cmltKFNQRUQwMDFBLT5JTSldNF08L0luc2NyaWNhb011bmljaXBhbD4NCiAgICAgIDxRdWFudGlkYWRlUnBzPjE8L1F1YW50aWRhZGVScHM+DQogICAgICA8TGlzdGFScHM+DQogICAgICAgIDxScHM+X19YTUxSUFM8L1Jwcz4NCiAgICAgIDwvTGlzdGFScHM+DQogICAgPC9Mb3RlUnBzPg0KICA8L0VudmlhckxvdGVScHNFbnZpbz4NCg==",
    XML_RPS:   "ICA8SW5mUnBzIHhtbG5zPSJodHRwOi8vd3d3LmFicmFzZi5vcmcuYnIvbmZzZS54c2QiIElkPSJfX0dFVElEQ0hBVkUiPg0KICAgIDxJZGVudGlmaWNhY2FvUnBzPg0KICAgICAgPE51bWVybz5bMVtpZGVudGlmaWNhY2FvOm51bWVyb3Jwc10xXTwvTnVtZXJvPg0KICAgICAgPFNlcmllPlsyW2lkZW50aWZpY2FjYW86c2VyaWVycHNdMl08L1NlcmllPg0KICAgICAgPFRpcG8+WzNbaWRlbnRpZmljYWNhbzp0aXBvXTNdPC9UaXBvPg0KICAgIDwvSWRlbnRpZmljYWNhb1Jwcz4NCiAgICA8RGF0YUVtaXNzYW8+WzRbaWRlbnRpZmljYWNhbzpkdGhyZW1pc3Nhb100XTwvRGF0YUVtaXNzYW8+DQogICAgPE5hdHVyZXphT3BlcmFjYW8gdHNzX2F0cmliX2RlcGFyYT0ic2ltcGxlcyI+WzVbaWRlbnRpZmljYWNhbzp0aXBvdHJpYl01XTwvTmF0dXJlemFPcGVyYWNhbz4NCiAgICA8UmVnaW1lRXNwZWNpYWxUcmlidXRhY2FvPls2W102XTwvUmVnaW1lRXNwZWNpYWxUcmlidXRhY2FvPg0KICAgIDxPcHRhbnRlU2ltcGxlc05hY2lvbmFsPls3W3ByZXN0YWRvcjpzaW1wbmFjXTddPC9PcHRhbnRlU2ltcGxlc05hY2lvbmFsPg0KICAgIDxJbmNlbnRpdmFkb3JDdWx0dXJhbD5bOFtwcmVzdGFkb3I6aW5jZW50Y3VsdF04XTwvSW5jZW50aXZhZG9yQ3VsdHVyYWw+DQogICAgPFN0YXR1cz5bOVtpZGVudGlmaWNhY2FvOnNpdHVhY2FvcnBzXTldPC9TdGF0dXM+DQogICAgPFJwc1N1YnN0aXR1aWRvPg0KICAgICAgPE51bWVybz5bMTBbXTEwXTwvTnVtZXJvPg0KICAgICAgPFNlcmllPlsxMVtdMTFdPC9TZXJpZT4NCiAgICAgIDxUaXBvPlsxMltdMTJdPC9UaXBvPg0KICAgIDwvUnBzU3Vic3RpdHVpZG8+DQogICAgPFNlcnZpY28gdHNzX2F0cmliX2xlZ2Fkbz0iW3NlcnZpY29zOnNlcnZpY29dIj4NCiAgICAgIDxWYWxvcmVzPg0KICAgICAgICA8VmFsb3JTZXJ2aWNvcyB0c3NfYXRyaWJfZm9ybWF0PSJkZWNpbWFsMiI+WzEzW3ZhbG9yZXM6dmFsdG90ZG9jXTEzXTwvVmFsb3JTZXJ2aWNvcz4NCiAgICAgICAgPFZhbG9yRGVkdWNvZXMgdHNzX2F0cmliX29icmlnYXQ9Im1haW9yMCI+WzE0W3NlcnZpY29zOnNlcnZpY286dmFsZGVkdV0xNF08L1ZhbG9yRGVkdWNvZXM+DQogICAgICAgIDxWYWxvclBpcyB0c3NfYXRyaWJfb2JyaWdhdD0ibWFpb3IwIj5bMTVbc2Vydmljb3M6c2Vydmljbzp2YWxwaXNdMTVdPC9WYWxvclBpcz4NCiAgICAgICAgPFZhbG9yQ29maW5zIHRzc19hdHJpYl9vYnJpZ2F0PSJtYWlvcjAiPlsxNltzZXJ2aWNvczpzZXJ2aWNvOnZhbGNvZl0xNl08L1ZhbG9yQ29maW5zPg0KICAgICAgICA8VmFsb3JJbnNzIHRzc19hdHJpYl9vYnJpZ2F0PSJtYWlvcjAiPlsxN1tzZXJ2aWNvczpzZXJ2aWNvOnZhbGluc3NdMTddPC9WYWxvckluc3M+DQogICAgICAgIDxWYWxvcklyIHRzc19hdHJpYl9vYnJpZ2F0PSJtYWlvcjAiPlsxOFtzZXJ2aWNvczpzZXJ2aWNvOnZhbGlyXTE4XTwvVmFsb3JJcj4NCiAgICAgICAgPFZhbG9yQ3NsbCB0c3NfYXRyaWJfb2JyaWdhdD0ibWFpb3IwIj5bMTlbc2Vydmljb3M6c2Vydmljbzp2YWxjc2xsXTE5XTwvVmFsb3JDc2xsPg0KICAgICAgICA8SXNzUmV0aWRvPlsyMFtzZXJ2aWNvczpzZXJ2aWNvOmlzc3JldGlkb10yMF08L0lzc1JldGlkbz4NCiAgICAgICAgPFZhbG9ySXNzPlsyMVtzZXJ2aWNvczpzZXJ2aWNvOnZhbGlzc10yMV08L1ZhbG9ySXNzPg0KICAgICAgICA8VmFsb3JJc3NSZXRpZG8gdHNzX2F0cmliX29icmlnYXQ9Im1haW9yMCI+WzIyW3NlcnZpY29zOnNlcnZpY286dmFsaXNzcmV0XTIyXTwvVmFsb3JJc3NSZXRpZG8+DQogICAgICAgIDxPdXRyYXNSZXRlbmNvZXMgdHNzX2F0cmliX29icmlnYXQ9Im1haW9yMCI+WzIzW3NlcnZpY29zOnNlcnZpY286b3V0cmFzcmV0XTIzXTwvT3V0cmFzUmV0ZW5jb2VzPg0KICAgICAgICA8QmFzZUNhbGN1bG8+WzI0W3NlcnZpY29zOnNlcnZpY286YmFzZWNhbGNdMjRdPC9CYXNlQ2FsY3Vsbz4NCiAgICAgICAgPEFsaXF1b3RhIHRzc19hdHJpYl9mb3JtYXQ9InBlcmNlbnR1YWwiPlsyNVtzZXJ2aWNvczpzZXJ2aWNvOmFsaXF1b3RhXTI1XTwvQWxpcXVvdGE+DQogICAgICAgIDxWYWxvckxpcXVpZG9OZnNlPlsyNltzZXJ2aWNvczpzZXJ2aWNvOnZhbGxpcV0yNl08L1ZhbG9yTGlxdWlkb05mc2U+DQogICAgICAgIDxEZXNjb250b0luY29uZGljaW9uYWRvIHRzc19hdHJpYl9vYnJpZ2F0PSJtYWlvcjAiPlsyN1tzZXJ2aWNvczpzZXJ2aWNvOmRlc2NpbmNdMjddPC9EZXNjb250b0luY29uZGljaW9uYWRvPg0KICAgICAgICA8RGVzY29udG9Db25kaWNpb25hZG8gdHNzX2F0cmliX29icmlnYXQ9Im1haW9yMCI+WzI4W3NlcnZpY29zOnNlcnZpY286ZGVzY2NvbmRdMjhdPC9EZXNjb250b0NvbmRpY2lvbmFkbz4NCiAgICAgIDwvVmFsb3Jlcz4NCiAgICAgIDxJdGVtTGlzdGFTZXJ2aWNvPlsyOVtzZXJ2aWNvczpzZXJ2aWNvOmNvZGlnb10yOV08L0l0ZW1MaXN0YVNlcnZpY28+DQogICAgICA8Q29kaWdvQ25hZT5bMzBbc2Vydmljb3M6c2VydmljbzpjbmFlXTMwXTwvQ29kaWdvQ25hZT4NCiAgICAgIDxDb2RpZ29UcmlidXRhY2FvTXVuaWNpcGlvPlszMVtzZXJ2aWNvczpzZXJ2aWNvOmNvZHRyaWJdMzFdPC9Db2RpZ29UcmlidXRhY2FvTXVuaWNpcGlvPg0KICAgICAgPERpc2NyaW1pbmFjYW8+WzMyW3NlcnZpY29zOnNlcnZpY286ZGlzY3JdMzJdPC9EaXNjcmltaW5hY2FvPg0KICAgICAgPENvZGlnb011bmljaXBpbz5bMzNbcHJlc3RhY2FvOmNvZG11bmliZ2VdMzNdPC9Db2RpZ29NdW5pY2lwaW8+DQogICAgPC9TZXJ2aWNvPg0KICAgIDxQcmVzdGFkb3I+DQogICAgICA8Q25waj5bMzRbcHJlc3RhZG9yOmNwZmNucGpdMzRdPC9DbnBqPg0KICAgICAgPEluc2NyaWNhb011bmljaXBhbD5bMzVbcHJlc3RhZG9yOmluc2NtdW5dMzVdPC9JbnNjcmljYW9NdW5pY2lwYWw+DQogICAgPC9QcmVzdGFkb3I+DQogICAgPFRvbWFkb3I+DQogICAgICA8SWRlbnRpZmljYWNhb1RvbWFkb3I+DQogICAgICAgIDxDcGZDbnBqIHRzc19hdHJpYl9jaG9pY2U9IkNwZixDbnBqIj5bMzZbdG9tYWRvcjpjcGZjbnBqXTM2XTwvQ3BmQ25waj4NCiAgICAgICAgPEluc2NyaWNhb011bmljaXBhbD5bMzdbdG9tYWRvcjppbnNjbXVuXTM3XTwvSW5zY3JpY2FvTXVuaWNpcGFsPg0KICAgICAgPC9JZGVudGlmaWNhY2FvVG9tYWRvcj4NCiAgICAgIDxSYXphb1NvY2lhbD5bMzhbdG9tYWRvcjpyYXphb10zOF08L1JhemFvU29jaWFsPg0KICAgICAgPEVuZGVyZWNvPg0KICAgICAgICA8RW5kZXJlY28+WzM5W3RvbWFkb3I6bG9ncmFkb3Vyb10zOV08L0VuZGVyZWNvPg0KICAgICAgICA8TnVtZXJvPls0MFt0b21hZG9yOm51bWVuZF00MF08L051bWVybz4NCiAgICAgICAgPENvbXBsZW1lbnRvPls0MVt0b21hZG9yOmNvbXBsZW5kXTQxXTwvQ29tcGxlbWVudG8+DQogICAgICAgIDxCYWlycm8+WzQyW3RvbWFkb3I6YmFpcnJvXTQyXTwvQmFpcnJvPg0KICAgICAgICA8Q29kaWdvTXVuaWNpcGlvPls0M1t0b21hZG9yOmNvZG11bmliZ2VdNDNdPC9Db2RpZ29NdW5pY2lwaW8+DQogICAgICAgIDxVZj5bNDRbdG9tYWRvcjp1Zl00NF08L1VmPg0KICAgICAgICA8Q2VwPls0NVt0b21hZG9yOmNlcF00NV08L0NlcD4NCiAgICAgIDwvRW5kZXJlY28+DQogICAgICA8Q29udGF0bz4NCiAgICAgICAgPFRlbGVmb25lIHRzc19hdHJpYl9nZXRfcGF0aD0ic2ltcGxlcyI+WzQ2W3RvbWFkb3JdNDZdPC9UZWxlZm9uZT4NCiAgICAgICAgPEVtYWlsPls0N1t0b21hZG9yOmVtYWlsXTQ3XTwvRW1haWw+DQogICAgICA8L0NvbnRhdG8+DQogICAgPC9Ub21hZG9yPg0KICAgIDxJbnRlcm1lZGlhcmlvU2Vydmljbz4NCiAgICAgIDxSYXphb1NvY2lhbD5bNDhbaW50ZXJtZWRpYXJpbzpyYXphb100OF08L1JhemFvU29jaWFsPg0KICAgICAgPENwZkNucGogdHNzX2F0cmliX2Nob2ljZT0iQ3BmLENucGoiPls0OVtpbnRlcm1lZGlhcmlvOmNwZmNucGpdNDldPC9DcGZDbnBqPg0KICAgICAgPEluc2NyaWNhb011bmljaXBhbCB0c3NfYXRyaWJfb2JyaWdhdD0ibWFpb3IwIj5bNTBbaW50ZXJtZWRpYXJpbzppbnNjbXVuXTUwXTwvSW5zY3JpY2FvTXVuaWNpcGFsPg0KICAgIDwvSW50ZXJtZWRpYXJpb1NlcnZpY28+DQogICAgPENvbnN0cnVjYW9DaXZpbD4NCiAgICAgIDxDb2RpZ29PYnJhPls1MVtjb25zdHJ1Y2FvOmNvZGlnb29icmFdNTFdPC9Db2RpZ29PYnJhPg0KICAgICAgPEFydD5bNTJbY29uc3RydWNhbzphcnRdNTJdPC9BcnQ+DQogICAgPC9Db25zdHJ1Y2FvQ2l2aWw+DQogIDwvSW5mUnBzPg0K",
    XMLCONSLOT:"PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCiAgPENvbnN1bHRhckxvdGVScHNFbnZpbyB4bWxucz0iaHR0cDovL3d3dy5hYnJhc2Yub3JnLmJyL25mc2UueHNkIj4NCiAgICA8UHJlc3RhZG9yPg0KICAgICAgPENucGo+WzFbQUxMVFJJTShTUEVEMDAxLT5DTlBKKV0xXTwvQ25waj4NCiAgICAgIDxJbnNjcmljYW9NdW5pY2lwYWw+WzJbYWxsdHJpbShTUEVEMDAxQS0+SU0pXTJdPC9JbnNjcmljYW9NdW5pY2lwYWw+DQogICAgPC9QcmVzdGFkb3I+DQogICAgPFByb3RvY29sbz5bM1tBbGx0cmltKFNQRUQwNTMtPlJFQ0lCTyldM108L1Byb3RvY29sbz4NCiAgPC9Db25zdWx0YXJMb3RlUnBzRW52aW8+DQo=",
    XMLCONSRPS:"PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCiAgPENvbnN1bHRhck5mc2VScHNFbnZpbyB4bWxucz0iaHR0cDovL3d3dy5hYnJhc2Yub3JnLmJyL25mc2UueHNkIj4NCiAgICA8SWRlbnRpZmljYWNhb1Jwcz4NCiAgICAgIDxOdW1lcm8+WzFbQWxsdHJpbShTUEVEMDUxLT5SUFMpXTFdPC9OdW1lcm8+DQogICAgICA8U2VyaWU+WzJbQWxsdHJpbShTUEVEMDUxLT5TRVJJRV9SUFMpXTJdPC9TZXJpZT4NCiAgICAgIDxUaXBvPlszW0FsbHRyaW0oU1BFRDA1MS0+VElQT19SUFMpXTNdPC9UaXBvPg0KICAgIDwvSWRlbnRpZmljYWNhb1Jwcz4NCiAgICA8UHJlc3RhZG9yPg0KICAgICAgPENucGo+WzRbYWxsdHJpbShTUEVEMDAxLT5DTlBKKV00XTwvQ25waj4NCiAgICAgIDxJbnNjcmljYW9NdW5pY2lwYWw+WzVbYWxsdHJpbShTUEVEMDAxQS0+SU0pXTVdPC9JbnNjcmljYW9NdW5pY2lwYWw+DQogICAgPC9QcmVzdGFkb3I+DQogIDwvQ29uc3VsdGFyTmZzZVJwc0VudmlvPg0K",
    XML_CANC:  "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCiAgPENhbmNlbGFyTmZzZUVudmlvIHhtbG5zPSJodHRwOi8vd3d3LmFicmFzZi5vcmcuYnIvbmZzZS54c2QiPg0KICAgIDxQZWRpZG8geG1sbnM9Imh0dHA6Ly93d3cuYWJyYXNmLm9yZy5ici9uZnNlLnhzZCI+DQogICAgICA8SW5mUGVkaWRvQ2FuY2VsYW1lbnRvIHhtbG5zPSJodHRwOi8vd3d3LmFicmFzZi5vcmcuYnIvbmZzZS54c2QiIElkPSJbMVtfb05mc2U6Y0xvdGVdMV0iPg0KICAgICAgICA8SWRlbnRpZmljYWNhb05mc2U+DQogICAgICAgICAgPE51bWVybz5bMlthbGx0cmltKFNQRUQwNTEtPk5GU0UpXTJdPC9OdW1lcm8+DQogICAgICAgICAgPENucGo+WzNbYWxsdHJpbShTUEVEMDAxLT5DTlBKKV0zXTwvQ25waj4NCiAgICAgICAgICA8SW5zY3JpY2FvTXVuaWNpcGFsPls0W2FsbHRyaW0oU1BFRDAwMUEtPklNKV00XTwvSW5zY3JpY2FvTXVuaWNpcGFsPg0KICAgICAgICAgIDxDb2RpZ29NdW5pY2lwaW8+WzVbYWxsdHJpbShTUEVEMDAxQS0+Q09EX01VTildNV08L0NvZGlnb011bmljaXBpbz4NCiAgICAgICAgPC9JZGVudGlmaWNhY2FvTmZzZT4NCiAgICAgICAgPENvZGlnb0NhbmNlbGFtZW50bz4yPC9Db2RpZ29DYW5jZWxhbWVudG8+DQogICAgICA8L0luZlBlZGlkb0NhbmNlbGFtZW50bz4NCiAgICA8L1BlZGlkbz4NCiAgPC9DYW5jZWxhck5mc2VFbnZpbz4NCg==",
    WSDL_PROD: "aHR0cHM6Ly9iaGlzc2RpZ2l0YWwucGJoLmdvdi5ici9iaGlzcy13cy9uZnNlP3dzZGw=",
    WSDL_HOMO: "aHR0cHM6Ly9iaGlzc2hvbW9sb2dhLnBiaC5nb3YuYnIvYmhpc3Mtd3MvbmZzZT93c2Rs",
    SIGN_LOTE: "TG90ZVJwcw==",
    SIGN_RPS:  "SW5mUnBz",
    SIGN_CANC: "SW5mUGVkaWRvQ2FuY2VsYW1lbnRv",
    SIGN_CONSR:" ",
    MUNICIPIO: "",
  };

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [ HttpClientTestingModule ],
      providers: [ ConfigurarApi, PoNotificationService ]
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    service = TestBed.inject(ConfigurarApi);
    config = TestBed.inject(PoNotificationService);
  });


  it('Should be Created Service.', () => {
    expect(service).toBeTruthy();
  });


  it(`${ConfigurarApi.prototype.GetIbge.name}() - Retorno da Função do Código IBGE do Brasil.`,  fakeAsync(() => {
    httpClientSpy.get.and.returnValue(of(bases));

    service.GetIbge('3528502').subscribe({
      next: response => {
        expect(response)
          .toEqual(bases); }});
  }));

  it(`${ConfigurarApi.prototype.GetIbge.name}() - Retorno da Função do Código IBGE do Brasil.`,  fakeAsync(() => {
    httpClientSpy.get.and.returnValue(of(bases));

    service.GetPesquisa('"3106200"').subscribe({
      next: response => {
        expect(response)
          .toEqual(jsonTSSNewNFse); }});
  }));

  it(`${ConfigurarApi.prototype.showAlertSucess.name}() - PoNotification de Sucesso.`,() =>{
    const PoNotificationSpy = spyOn(config, 'success');
    service.showAlertSucess("Felipe Luna");
    expect(PoNotificationSpy).toHaveBeenCalled();
  });

  it(`${ConfigurarApi.prototype.handleError.name}() - PoNotification de ERRO na requisição da API do TSS0013.`,() =>{
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

  it(`${ConfigurarApi.prototype.handleError.name}() - PoNotification de ERRO na requisição da API do TSS0013. Err.Status = 500.`,() =>{
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

});


