import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoNotification, PoNotificationService, PoToasterOrientation } from '@po-ui/ng-components';
import { throwError } from 'rxjs';
import { MunGet, MunIbge } from './configurar';


@Injectable({
  providedIn: 'root'
})
export class ConfigurarApi {

  //Vari�vel de ambiente
  private readonly API = 'http://localhost:1322/rest/api/v1/ApiNewNfse/getmunicipio?filter=';
  private readonly apiIbge = 'https://servicodados.ibge.gov.br/api/v1/localidades/municipios/'
  httpClient: any;
  endPontGET: String;

  constructor(
    private http: HttpClient,
    private poNotificationService: PoNotificationService
    ){}

//Metodo de busca no back end
  GetPesquisa(Municipio){
    //Retorna o arquivo .json completo
    this.endPontGET = Municipio;
    return  this.http.get<MunGet>(`${this.API}${this.endPontGET}`)
  }

//Metodo de busca na api do IBGE
  GetIbge(Municipio){
    this.endPontGET = Municipio;
    return this.http.get<MunIbge>(`${this.apiIbge}${this.endPontGET}`)
  }

  handleError(err: HttpErrorResponse) {
    console.log(err);
    console.log(err.error);
    if(err.status == 500){
        this.poNotificationService.error(err.status + ' - ' + err.statusText)
    }else{
        this.poNotificationService.error(err.status + ' - ' + err.message)
    }

    return throwError('Não foi possível concluir a solicitação');
    }

    showAlertSucess(message: string){
      this.poNotificationService.success(message);
    }
}
