import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MunGet } from './configurar';


@Injectable({
  providedIn: 'root'
})
export class ConfigurarApi {
  //Variável de ambiente
  private readonly API = 'http://localhost:1322/rest/api/v1/SchemaConv/getmunicipio?filter=';
  httpClient: any;
  endPontGET: String;

  constructor(private http: HttpClient){}

  GetPesquisa(Municipio){
    //Retorna o arquivo .json completo
    this.endPontGET = Municipio;
    return  this.http.get<MunGet>(`${this.API}${this.endPontGET}`)
  }
}
