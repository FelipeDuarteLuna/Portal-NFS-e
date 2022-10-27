import { Observable, take, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRps } from './rps';
import { environment } from 'src/environments/environment';
import { PoNotification, PoNotificationService, PoToasterOrientation } from '@po-ui/ng-components';



@Injectable({
  providedIn: 'root'
})
export class RpsService {

  xmlUnico: string;
  parser = new DOMParser();
  xmlParse:any = '';
  xmlUnico4: any = '';
  endPontGET : String = 'getmunicipio';
  endPontPOST : String = 'updtss0013';

  //private readonly API = 'http://localhost:3000/tssNewNfse'; Chamando o endereÃ§o direto da API
  //private readonly API = environment.API; //Quando o endereÃ§o for http://localhost:3000/tssNewNfse
  private readonly API = `${environment.API}tssNewNfse`;
  private readonly API_RENAN = 'http://10.173.5.18:8080/rest/api/v1/SchemaConv/'; //Chamando o endereÃ§o direto da API

  constructor(
      private http: HttpClient,
      private poNotificationService: PoNotificationService
    ) { }

  getXmlUnico(){
    //this.xmlUnico = '<identificacao>' + '\n\t<dthremissao>2022-06-09T14:05:13</dthremissao><serierps>T</serierps><numerorps>57</numerorps><tipo>1</tipo><situacaorps>1</situacaorps><tiporecolhe>1</tiporecolhe><tipooper>1</tipooper><tipotrib>6</tipotrib><localServ>1</localServ></identificacao>';
    this.xmlUnico = '<?xml version="1.0" encoding="utf-8"?>\n<rps id="rps:1" tssversao="2.00">\n\t<assinatura>5863eccc4416a6244145ea8e18cc1ecc587fd18b</assinatura>\n<identificacao>\n\t<dthremissao>2022-06-09T14:05:13</dthremissao>\n\t<serierps>T</serierps>\n\t<numerorps>57</numerorps>\n\t<tipo>1</tipo>\n\t<situacaorps>1</situacaorps>\n\t<tiporecolhe>1</tiporecolhe>\n\t<tipooper>1</tipooper>\n\t<tipotrib>6</tipotrib>\n\t<localServ>1</localServ>\n</identificacao>\n<atividade>\n\t<codigo>7120100</codigo>\n\t<aliquota>3.0000</aliquota>\n</atividade><prestador><inscmun>00018566</inscmun><cpfcnpj>19537752002753</cpfcnpj><razao>ORGUEL INDUSTRIA E LOCACAO DE EQUIPAMENTOS S/A</razao><fantasia>********</fantasia><codmunibge>4120804</codmunibge><cidade>QUATRO BARRAS</cidade><uf>PR</uf><email>teste@teste.com.br</email><ddd>41</ddd><telefone>32769877</telefone><simpnac>2</simpnac><incentcult>2</incentcult><logradouro>AV JOAO KNAPIK</logradouro><numend>118</numend><compleend>TEXTO</compleend><bairro>CENTRO</bairro><tplogradouro>2</tplogradouro><cep>83420000</cep></prestador><prestacao><serieprest>99</serieprest><codmunibge>4120804</codmunibge><codmunibgeinc>4120804</codmunibgeinc><municipio>QUATRO BARRAS</municipio><uf>PR</uf></prestacao><tomador><inscmun/><cpfcnpj>18526569000150</cpfcnpj><razao>TESTE EMISSAO CNPJ - HOMOLOGACAO E SERVICOS</razao><tipologr>2</tipologr><logradouro>AV JOAO KNAPIK</logradouro><numend>118</numend><complend>COMPLEMENTO</complend><tipobairro>1</tipobairro><bairro>CENTRO</bairro><codmunibge>4120804</codmunibge><cidade>QUATRO BARRAS</cidade><uf>PR</uf><cep>83420000</cep><email>teste@teste.com.br</email><ddd>41</ddd><telefone>32769877</telefone><codpais>1058</codpais><nomepais>Brasil</nomepais><estrangeiro>2</estrangeiro><notificatomador>2</notificatomador></tomador><servicos><servico><codigo>0305</codigo><aliquota>3.00</aliquota><idcnae/><cnae>7739099</cnae><codtrib>0508</codtrib><discr>TESTE EMISSÃƒÆ’Ã†â€™O CNPJ - HOMOLOGACAO - SERVIÃƒÆ’Ã¢â‚¬Â¡OS</discr><quant>1.0000</quant><valunit>1.00</valunit><valtotal>1.00</valtotal><basecalc>1.00</basecalc><issretido>2</issretido><valdedu>0</valdedu><valpis>0.00</valpis><valcof>0.00</valcof><valinss>0.00</valinss><valir>0.00</valir><valcsll>0.00</valcsll><valiss>0.03</valiss><valissret>0.00</valissret><outrasret>0.00</outrasret><valliq>1.00</valliq><desccond>0.00</desccond><descinc>0.00</descinc><unidmed>UN</unidmed></servico></servicos><valores><iss>0.03</iss><issret>0.00</issret><outrret>0.00</outrret><pis>0.00</pis><cofins>0.00</cofins><inss>0.00</inss><ir>0.00</ir><csll>0.00</csll><aliqiss>3.0000</aliqiss><aliqpis>0.0000</aliqpis><aliqcof>0.0000</aliqcof><aliqinss>0.0000</aliqinss><aliqir>0.0000</aliqir><aliqcsll>0.0000</aliqcsll><valtotdoc>1.00</valtotdoc></valores><infcompl><descricao>TESTE DE DESCRIÃƒÆ’Ã¢â‚¬Â¡ÃƒÆ’Ã†â€™O COMPLEMENTAR</descricao><observacao>TESTE DE OBSERVAÃƒÆ’Ã¢â‚¬Â¡ÃƒÆ’Ã†â€™O COMPLEMENTAR</observacao></infcompl></rps>';

    return this.xmlUnico;
  }

  list(){
    //return  this.http.get(this.API); Retorna o arquivo .json completo
    return  this.http.get<IRps>(this.API);
    //return  this.http.get<IRps>(`${this.API}${this.endPontGET}`);  // return this.http.get(`${this.URL_API}${this.endpoint}`, { params });
  }

  GetRenans2Lucia(){
    //return  this.http.get(this.API); Retorna o arquivo .json completo

    return  this.http.get<IRps>(`${this.API}${this.endPontGET}`);  // return this.http.get(`${this.URL_API}${this.endpoint}`, { params });
  }

  post(IRps){

    console.log(IRps);
    //return this.http.post(this.API, IRps).pipe(take(1));
    return this.http.post(`${this.API_RENAN}${this.endPontPOST}`, IRps).pipe(take(1)); //`${this.URL_API}${this.endpointpost}`
  }

  handleError(err: HttpErrorResponse) {
    console.log(err);
    console.log(err.error);
    if(err.status == 500){
        this.poNotificationService.error(err.status + ' - ' + err.statusText)
    }else{
        this.poNotificationService.error(err.status + ' - ' + err.message)
    }

    return throwError('N�o foi poss��vel concluir a solicita��o');
    }

    showAlertSucess(message: string){
      this.poNotificationService.success(message);
    }
}
