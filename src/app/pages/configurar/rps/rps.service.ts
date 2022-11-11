import { take, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PoNotification, PoNotificationService, PoToasterOrientation } from '@po-ui/ng-components';
import { IRps } from './rps';
import { PageDefault } from '../page-default/PageDefault';



@Injectable({
  providedIn: 'root'
})
export class RpsService {

  xmlUnico: string;
  xmlParse:any = '';
  xmlUnico4: any = '';
  endPontGET : String = 'getmunicipio';
  endPontPOST : String = 'setmunicipio';


  private readonly API = `${environment.API}tssNewNfse`;
  private readonly API_RENAN = 'http://localhost:1322/rest/api/v1/apinewnfse/'; //Chamando o endereço direto da API
  //private readonly API_RENAN = 'http://10.173.5.18:8080/rest/api/v1/apinewnfse/'; //Chamando o endereço direto da API

  constructor(
      private http: HttpClient,
      private poNotificationService: PoNotificationService
    ) { }

  getXmlUnico(Metodo: string){

    if( Metodo !== null && Metodo !== undefined ){

       if ( Metodo.toUpperCase() == "RPS" ) {
        this.xmlUnico = atob("PHJwcyBpZD0icnBzOjE3IiB0c3N2ZXJzYW89IjIuMDAiPg0KCTxhc3NpbmF0dXJhPjU4NjNlY2NjNDQxNmE2MjQ0MTQ1ZWE4ZTE4Y2MxZWNjNTg3ZmQxOGI8L2Fzc2luYXR1cmE+DQoJPGlkZW50aWZpY2FjYW8+DQoJCTxkdGhyZW1pc3Nhbz4yMDIyLTExLTAxVDAwOjA1OjEzPC9kdGhyZW1pc3Nhbz4NCgkJPHNlcmllcnBzPlJQUzwvc2VyaWVycHM+DQoJCTxudW1lcm9ycHM+MTc8L251bWVyb3Jwcz4NCgkJPHRpcG8+MTwvdGlwbz4NCgkJPHNpdHVhY2FvcnBzPjE8L3NpdHVhY2FvcnBzPg0KCQk8dGlwb3JlY29saGU+MTwvdGlwb3JlY29saGU+DQoJCTx0aXBvb3Blcj4xPC90aXBvb3Blcj4NCgkJPHRpcG90cmliPjY8L3RpcG90cmliPg0KCQk8bG9jYWxTZXJ2PjE8L2xvY2FsU2Vydj4NCgk8L2lkZW50aWZpY2FjYW8+DQoJPHByZXN0YWRvcj4NCgkJPGluc2NtdW4+MDAwMTEyMjI8L2luc2NtdW4+DQoJCTxjcGZjbnBqPjAwMTExMzMzMDAwMTIyPC9jcGZjbnBqPg0KCQk8cmF6YW8+UkFaw4NPIFNPQ0lBTCBURVNURSBTL0E8L3JhemFvPg0KCQk8ZmFudGFzaWE+VEVTVEUgUy9BPC9mYW50YXNpYT4NCgkJPGNvZG11bmliZ2U+MzU1MDMwODwvY29kbXVuaWJnZT4NCgkJPGNpZGFkZT5Tw4NPIFBBVUxPPC9jaWRhZGU+DQoJCTx1Zj5TUDwvdWY+DQoJCTxlbWFpbD50ZXN0ZUB0ZXN0ZS5jb20uYnI8L2VtYWlsPg0KCQk8ZGRkPjExPC9kZGQ+DQoJCTx0ZWxlZm9uZT4yMjMzNDQ1NTwvdGVsZWZvbmU+DQoJCTxzaW1wbmFjPjI8L3NpbXBuYWM+DQoJCTxpbmNlbnRjdWx0PjI8L2luY2VudGN1bHQ+DQoJCTxsb2dyYWRvdXJvPkFWIEJSQVogTEVNRTwvbG9ncmFkb3Vybz4NCgkJPG51bWVuZD4xMDAwPC9udW1lbmQ+DQoJCTxjb21wbGVlbmQ+QkxPQ08gQTwvY29tcGxlZW5kPg0KCQk8YmFpcnJvPkpBUkRJTSBTw4NPIEJFTlRPPC9iYWlycm8+DQoJCTx0cGxvZ3JhZG91cm8+MTwvdHBsb2dyYWRvdXJvPg0KCQk8Y2VwPjAyNTE0MDgwPC9jZXA+DQoJPC9wcmVzdGFkb3I+DQoJPHByZXN0YWNhbz4NCgkJPHNlcmllcHJlc3Q+UlBTPC9zZXJpZXByZXN0Pg0KCQk8Y29kbXVuaWJnZT4zNTUwMzA4PC9jb2RtdW5pYmdlPg0KCQk8Y29kbXVuaWJnZWluYz4zNTUwMzA4PC9jb2RtdW5pYmdlaW5jPg0KCQk8bXVuaWNpcGlvPlPDg08gUEFVTE88L211bmljaXBpbz4NCgkJPHVmPlNQPC91Zj4NCgk8L3ByZXN0YWNhbz4NCgk8dG9tYWRvcj4NCgkJPGluc2NtdW4vPg0KCQk8Y3BmY25waj4wMDExMTIyMjAwMDEzMzwvY3BmY25waj4NCgkJPHJhemFvPlRPTUFET1IgUkFaw4NPIFNPQ0lBTCBMVERBPC9yYXphbz4NCgkJPHRpcG9sb2dyPjE8L3RpcG9sb2dyPg0KCQk8bG9ncmFkb3Vybz5BVi4gQVRMw4JOVElDQTwvbG9ncmFkb3Vybz4NCgkJPG51bWVuZD4xNzAyPC9udW1lbmQ+DQoJCTxjb21wbGVuZD5QUkFJQTwvY29tcGxlbmQ+DQoJCTx0aXBvYmFpcnJvPjI8L3RpcG9iYWlycm8+DQoJCTxiYWlycm8+Q09QQUNBQkFOQTwvYmFpcnJvPg0KCQk8Y29kbXVuaWJnZT40MTIwODA0PC9jb2RtdW5pYmdlPg0KCQk8Y2lkYWRlPlFVQVRSTyBCQVJSQVM8L2NpZGFkZT4NCgkJPHVmPlBSPC91Zj4NCgkJPGNlcD44MzQyMDAwMDwvY2VwPg0KCQk8ZW1haWw+dGVzdGVAdGVzdGUuY29tLmJyPC9lbWFpbD4NCgkJPGRkZD4yMTwvZGRkPg0KCQk8dGVsZWZvbmU+MjU0ODcxNzE8L3RlbGVmb25lPg0KCQk8Y29kcGFpcz4xMDU4PC9jb2RwYWlzPg0KCQk8bm9tZXBhaXM+QnJhc2lsPC9ub21lcGFpcz4NCgkJPGVzdHJhbmdlaXJvPjI8L2VzdHJhbmdlaXJvPg0KCQk8bm90aWZpY2F0b21hZG9yPjI8L25vdGlmaWNhdG9tYWRvcj4NCgk8L3RvbWFkb3I+DQoJPHNlcnZpY29zPg0KCQk8c2Vydmljbz4NCgkJCTxjb2RpZ28+MTQuMDE8L2NvZGlnbz4NCgkJCTxhbGlxdW90YT4zLjAwPC9hbGlxdW90YT4NCgkJCTxpZGNuYWUvPg0KCQkJPGNuYWU+NzczOTA5OTwvY25hZT4NCgkJCTxjb2R0cmliPjA1MDg8L2NvZHRyaWI+DQoJCQk8ZGlzY3I+REVTQ1JJw4fDg08gRE8gU0VSVknDh08gLSBIT01PTE9HQcOHw4NPPC9kaXNjcj4NCgkJCTxxdWFudD4xLjAwMDA8L3F1YW50Pg0KCQkJPHZhbHVuaXQ+MS4wMDwvdmFsdW5pdD4NCgkJCTx2YWx0b3RhbD4xLjAwPC92YWx0b3RhbD4NCgkJCTxiYXNlY2FsYz4xLjAwPC9iYXNlY2FsYz4NCgkJCTxpc3NyZXRpZG8+MjwvaXNzcmV0aWRvPg0KCQkJPHZhbGRlZHU+MDwvdmFsZGVkdT4NCgkJCTx2YWxwaXM+MC4wMDwvdmFscGlzPg0KCQkJPHZhbGNvZj4wLjAwPC92YWxjb2Y+DQoJCQk8dmFsaW5zcz4wLjAwPC92YWxpbnNzPg0KCQkJPHZhbGlyPjAuMDA8L3ZhbGlyPg0KCQkJPHZhbGNzbGw+MC4wMDwvdmFsY3NsbD4NCgkJCTx2YWxpc3M+MC4wMzwvdmFsaXNzPg0KCQkJPHZhbGlzc3JldD4wLjAwPC92YWxpc3NyZXQ+DQoJCQk8b3V0cmFzcmV0PjAuMDA8L291dHJhc3JldD4NCgkJCTx2YWxsaXE+MS4wMDwvdmFsbGlxPg0KCQkJPGRlc2Njb25kPjAuMDA8L2Rlc2Njb25kPg0KCQkJPGRlc2NpbmM+MC4wMDwvZGVzY2luYz4NCgkJCTx1bmlkbWVkPlVOPC91bmlkbWVkPg0KCQk8L3NlcnZpY28+DQoJPC9zZXJ2aWNvcz4NCgk8dmFsb3Jlcz4NCgkJPGlzcz4wLjAzPC9pc3M+DQoJCTxpc3NyZXQ+MC4wMDwvaXNzcmV0Pg0KCQk8b3V0cnJldD4wLjAwPC9vdXRycmV0Pg0KCQk8cGlzPjAuMDA8L3Bpcz4NCgkJPGNvZmlucz4wLjAwPC9jb2ZpbnM+DQoJCTxpbnNzPjAuMDA8L2luc3M+DQoJCTxpcj4wLjAwPC9pcj4NCgkJPGNzbGw+MC4wMDwvY3NsbD4NCgkJPGFsaXFpc3M+My4wMDAwPC9hbGlxaXNzPg0KCQk8YWxpcXBpcz4wLjAwMDA8L2FsaXFwaXM+DQoJCTxhbGlxY29mPjAuMDAwMDwvYWxpcWNvZj4NCgkJPGFsaXFpbnNzPjAuMDAwMDwvYWxpcWluc3M+DQoJCTxhbGlxaXI+MC4wMDAwPC9hbGlxaXI+DQoJCTxhbGlxY3NsbD4wLjAwMDA8L2FsaXFjc2xsPg0KCQk8dmFsdG90ZG9jPjEuMDA8L3ZhbHRvdGRvYz4NCgk8L3ZhbG9yZXM+DQoJPGluZmNvbXBsPg0KCQk8ZGVzY3JpY2FvPlRFU1RFIERFIERFU0NSScOHw4NPIENPTVBMRU1FTlRBUjwvZGVzY3JpY2FvPg0KCQk8b2JzZXJ2YWNhbz5URVNURSBERSBPQlNFUlZBw4fDg08gQ09NUExFTUVOVEFSPC9vYnNlcnZhY2FvPg0KCTwvaW5mY29tcGw+DQo8L3Jwcz4=");
      }
    }

    return this.xmlUnico;
  }

  list(){

    return  this.http.get<IRps>(this.API);
  }

  GetRenans2Lucia(){

    //return  this.http.get(this.API); Retorna o arquivo .json completo
    return  this.http.get<IRps>(`${this.API}${this.endPontGET}`);  // return this.http.get(`${this.URL_API}${this.endpoint}`, { params });
  }

  post( jsonPostNewNfse: PageDefault ){

    console.log(jsonPostNewNfse);
    return this.http.post(`${this.API_RENAN}${this.endPontPOST}`, jsonPostNewNfse).pipe(take(1));
  }

  handleError(err: HttpErrorResponse) {
    console.log(err);
    console.log(err.error);
    if(err.status == 500){
        this.poNotificationService.error(err.status + ' - ' + err.statusText)
    }else{
        this.poNotificationService.error(err.status + ' - ' + err.message)
    }

    return throwError('Não foi possí­vel concluir a solicitação');
    }

    showAlertSucess(message: string){
      this.poNotificationService.success(message);
    }
}
