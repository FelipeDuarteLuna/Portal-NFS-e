import { ConfigurarApi } from './configurar.service';
import { SamplePoTableTransportService } from './configurar-component.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { PoComboOptionGroup, PoMenuItem, PoSelectOption, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { MunGet, MunIbge } from './configurar';

@Component({
  selector: 'app-configurar',
  templateUrl: './configurar.component.html',
  styleUrls: ['./configurar.component.scss'],
  providers: [SamplePoTableTransportService]
})

export class ConfigurarComponent implements OnInit{

  comboPesquisa: Array<PoComboOptionGroup>;
  selectedOptionsGroup: string;
  event: string;

  filterParams = {};
  menuItemSelected: string;
  columns: Array<PoTableColumn>;
  items: Array<any>;

  Detalhes: Array<PoTableAction> = [
    {label:"Detalhes", action: this.onClick_Detalhes.bind(this) }
  ];

  readonly statusOptions: Array<PoSelectOption> = [
    { label: '1', value: 'concluido' },
    { label: '2', value: 'pendente' },
    { label: '3', value: 'cancelado' }
  ];
  xmlUnico: string;
  Municipio: string;
  xmlUnico3: MunGet = {
    code: ''
  };

    constructor(
      private transportService: SamplePoTableTransportService,
      private router: Router,
      private ConfigurarApi: ConfigurarApi
      ) {}


    ngOnInit() {
      this.columns = this.transportService.getColumns();
      this.items = this.transportService.getItems();
      this.menuItemSelected = 'Configurar > Modelo';
      this.ConfigurarApi.httpClient = this.Municipio
      }

    printMenuAction(menu: PoMenuItem) {
      this.menuItemSelected = menu.label;
      console.log(this);
      console.log('Menu ativo.');
    }

//Tratamento botao home
  onClick_Home() {
    this.router.navigate(['/home']);
  }

//Chamado Detalhes Configurar
onClick_Detalhes(Event){
  console.log(' onClick_Detalhes, event: ', Event)
  console.log(Event.Detalhes);
  this.router.navigate([Event.Detalhes],
    { state: { metodo: Event.Modelo, conteudoXml: Event.Conteudo, codMunicipio: this.Municipio, Municipio: this.xmlUnico3.DESC_MUN,
      Versao: this.xmlUnico3.VERSAO, Provedor: this.xmlUnico3.PROVEDOR } });
}

  //Consulta Pesquisa codmun
  onClick_Pesquisa(event) {

    this.ConfigurarApi.GetPesquisa(this.Municipio).subscribe(
      success =>{
        this.ConfigurarApi.showAlertSucess("Requisição Get, realizada com sucesso.")
        if(typeof success.code == 'undefined'){
          this.carregaTela(success)
        }else if(success.code == '202'){
            this.apiIbge(this.Municipio)
        }
      },
      error =>{
        this.ConfigurarApi.handleError(error);
      }, () => console.log('Request completado com sucesso.')
    );

  }

  onClick_Export(){
    alert('Exportar XML - PFD - DOC!!')
  }

  apiIbge(event){
    this.ConfigurarApi.GetIbge(this.Municipio).subscribe((jsonTSSNewNFse: MunIbge) => {
    this.xmlUnico3.DESC_MUN = jsonTSSNewNFse["nome"];
    this.xmlUnico3.UF = jsonTSSNewNFse["regiao-imediata"]["regiao-intermediaria"].UF.sigla;
    this.xmlUnico3.VERSAO = '';
    this.items[0].Conteudo = '';
    this.items[1].Conteudo = '';
    this.items[2].Conteudo = '';
    this.items[3].Conteudo = '';
    this.items[4].Conteudo = '';
    this.items[5].Conteudo = '';
    this.items[6].Conteudo = '';
    this.items[7].Conteudo = '';
    this.items[8].Conteudo = '';
    this.items[9].Conteudo = '';
    this.items[10].Conteudo = '';
    this.items[11].Conteudo = '';
    this.items[12].Conteudo = '';
     });
  }

  carregaTela(jsonTSSNewNFse: MunGet){
    //aqui monto os dados que serão carregados no xml
    this.xmlUnico3.DESC_MUN = jsonTSSNewNFse["DESC_MUN"];
    this.xmlUnico3.VERSAO = jsonTSSNewNFse["VERSAO"];
    this.xmlUnico3.UF = jsonTSSNewNFse["UF"];
    this.xmlUnico3.PROVEDOR = jsonTSSNewNFse["PROVEDOR"]; // luna
    //AQUI CARREGA A <POTABLE>
    this.items[0].Conteudo = jsonTSSNewNFse["PROVEDOR"];
    this.items[1].Conteudo = jsonTSSNewNFse["MODELO"];
    this.items[2].Conteudo = atob(jsonTSSNewNFse["XML_LOTE"]);
    this.items[3].Conteudo = atob(jsonTSSNewNFse["XML_RPS"]);
    this.items[4].Conteudo = atob(jsonTSSNewNFse["XMLCONSLOT"]);
    this.items[5].Conteudo = atob(jsonTSSNewNFse["XMLCONSRPS"]);
    this.items[6].Conteudo = atob(jsonTSSNewNFse["XML_CANC"]);
    this.items[7].Conteudo = atob(jsonTSSNewNFse["WSDL_PROD"]);
    this.items[8].Conteudo = atob(jsonTSSNewNFse["WSDL_HOMO"]);
    this.items[9].Conteudo = atob(jsonTSSNewNFse["SIGN_LOTE"]);
    this.items[10].Conteudo = atob(jsonTSSNewNFse["SIGN_RPS"]);
    this.items[11].Conteudo = atob(jsonTSSNewNFse["SIGN_CANC"]);
    this.items[12].Conteudo = atob(jsonTSSNewNFse["SIGN_CONSR"]);
    }
}
