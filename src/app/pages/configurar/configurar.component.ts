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

  codMunicipio: any;

  private blod: any;
  private ArrayItemsExport: any= [];
  private luna: any;

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
  code: '',name:'', Descricao:''
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

      this.codMunicipio = sessionStorage.getItem("CodMunIBGE");

      if( this.codMunicipio !== null && this.codMunicipio !== undefined ){
          this.Municipio = this.codMunicipio;
          this.onClick_Pesquisa();
      }
    }

    printMenuAction(menu: PoMenuItem) {

      this.menuItemSelected = menu.label;
    }

//Tratamento botao home
  onClick_Home() {
    this.router.navigate(['/home']);
  }

//Chamado Detalhes Configurar
onClick_Detalhes(Event){

  this.router.navigate([Event.Detalhes],
    { state: { metodo: Event.Modelo, conteudoXml: Event.Conteudo, codMunicipio: this.Municipio, Municipio: this.xmlUnico3.DESC_MUN,
     UF: this.xmlUnico3.UF, Versao: this.xmlUnico3.VERSAO, Provedor: this.xmlUnico3.PROVEDOR } });
}

  //Consulta Pesquisa codmun
  onClick_Pesquisa(event?) {

    this.ConfigurarApi.GetPesquisa(this.Municipio).subscribe(
      success =>{
        if(typeof success.code == 'undefined'){
          this.luna = success
          this.carregaTela(success)
        }else if(success.name == 'Not Found'){
          this.apiIbge(this.Municipio)
        }
    },
      error =>{
        this.ConfigurarApi.handleError(error);
      },
      () => {
          console.log('Request completado com sucesso.');
          sessionStorage.removeItem( "CodMunIBGE" );
      }
    );

  }

  apiIbge(event){
    this.ConfigurarApi.GetIbge(this.Municipio).subscribe((jsonTSSNewNFse: MunIbge) => {

    if(jsonTSSNewNFse["nome"] == undefined && jsonTSSNewNFse.length == 0){
      this.xmlUnico3.DESC_MUN = '';
      this.xmlUnico3.UF = '';
      this.xmlUnico3.VERSAO = '';
    }else{
      this.xmlUnico3.DESC_MUN = jsonTSSNewNFse["nome"];
      this.xmlUnico3.UF = jsonTSSNewNFse["regiao-imediata"]["regiao-intermediaria"].UF.sigla;
      this.xmlUnico3.VERSAO = 'Município não homologado no TSS.';
    };

    if(event.length < 7 && event.length > 0  ){
      alert("Digite um código IBGE válido, com 7 dígitos.");
    }else if(jsonTSSNewNFse["nome"] == undefined && jsonTSSNewNFse.length == 0){
      alert('Digite um código de município válido!');
    };

    //Limpando os campos do grid
    for(let i = 0; i<= this.items.length; i++){
      this.items[i].Conteudo = '';
      this.items[i].Status = '2'
    }
    this.xmlUnico3.PROVEDOR = '';
  });
}

  carregaTela(jsonTSSNewNFse: MunGet){
    //aqui monto os dados que serão carregados no xml
    this.xmlUnico3.DESC_MUN = atob(jsonTSSNewNFse["DESC_MUN"]);
    this.xmlUnico3.VERSAO = jsonTSSNewNFse["VERSAO"];
    this.xmlUnico3.UF = jsonTSSNewNFse["UF"];
    this.xmlUnico3.PROVEDOR = jsonTSSNewNFse["PROVEDOR"];
    //AQUI CARREGA A <POTABLE>

    (jsonTSSNewNFse["PROVEDOR"]==undefined ? this.items[0].Conteudo = '' : this.items[0].Conteudo = jsonTSSNewNFse["PROVEDOR"]);
    (this.items[0].Conteudo=='' ? this.items[0].Status = '2' : this.items[0].Status = '1');

    (jsonTSSNewNFse["MODELO"] ==undefined ? this.items[1].Conteudo ='' : this.items[1].Conteudo = jsonTSSNewNFse["MODELO"]);
    (this.items[1].Conteudo =='' ? this.items[1].Status = '2' : this.items[1].Status = '1');

    (jsonTSSNewNFse["VERSAO"] ==undefined ? this.items[2].Conteudo ='' : this.items[2].Conteudo = jsonTSSNewNFse["VERSAO"]);
    (this.items[2].Conteudo =='' ? this.items[2].Status = '2' : this.items[2].Status = '1');

    (jsonTSSNewNFse["XML_LOTE"] ==undefined ? this.items[3].Conteudo ='' : this.items[3].Conteudo = atob(jsonTSSNewNFse["XML_LOTE"]));
    (this.items[3].Conteudo=='' ? this.items[3].Status = '2' : this.items[3].Status = '1');

    (jsonTSSNewNFse["XML_RPS"]==undefined ? this.items[4].Conteudo = '' : this.items[4].Conteudo = atob(jsonTSSNewNFse["XML_RPS"]));
    (this.items[4].Conteudo=='' ? this.items[4].Status = '2' : this.items[4].Status = '1');

    (jsonTSSNewNFse["XMLCONSLOT"]==undefined ? this.items[5].Conteudo = '' : this.items[5].Conteudo = atob(jsonTSSNewNFse["XMLCONSLOT"]));
    (this.items[5].Conteudo=='' ? this.items[5].Status = '2' : this.items[5].Status = '1');

    (jsonTSSNewNFse["XMLCONSRPS"]==undefined ? this.items[6].Conteudo = '' : this.items[6].Conteudo = atob(jsonTSSNewNFse["XMLCONSRPS"]));
    (this.items[6].Conteudo=='' ? this.items[6].Status = '2' : this.items[6].Status = '1');

    (jsonTSSNewNFse["XML_CANC"]==undefined ? this.items[7].Conteudo = '' : this.items[7].Conteudo = atob(jsonTSSNewNFse["XML_CANC"]));
    (this.items[7].Conteudo=='' ? this.items[7].Status = '2' : this.items[7].Status = '1');

    (jsonTSSNewNFse["WSDL_PROD"]==undefined ? this.items[8].Conteudo = '' : this.items[8].Conteudo = atob(jsonTSSNewNFse["WSDL_PROD"]));
    (this.items[8].Conteudo=='' ? this.items[8].Status = '2' : this.items[8].Status = '1');

    (jsonTSSNewNFse["WSDL_HOMO"]==undefined ? this.items[9].Conteudo ='' : this.items[9].Conteudo = atob(jsonTSSNewNFse["WSDL_HOMO"]));
    (this.items[9].Conteudo=='' ? this.items[9].Status = '2' : this.items[9].Status = '1');

    (jsonTSSNewNFse["SIGN_LOTE"]==undefined ? this.items[10].Conteudo ='' : this.items[10].Conteudo = atob(jsonTSSNewNFse["SIGN_LOTE"]));
    (this.items[10].Conteudo=='' ? this.items[10].Status = '2' : this.items[10].Status = '1');

    (jsonTSSNewNFse["SIGN_RPS"]==undefined ? this.items[11].Conteudo ='' : this.items[11].Conteudo = atob(jsonTSSNewNFse["SIGN_RPS"]));
    (this.items[11].Conteudo=='' ? this.items[11].Status = '2' : this.items[11].Status = '1');

    (jsonTSSNewNFse["SIGN_CANC"]==undefined ? this.items[12].Conteudo ='' : this.items[12].Conteudo = atob(jsonTSSNewNFse["SIGN_CANC"]));
    (this.items[12].Conteudo=='' ? this.items[12].Status = '2' : this.items[12].Status = '1');

    (jsonTSSNewNFse["SIGN_CONSR"]==undefined ? this.items[13].Conteudo ='' : this.items[13].Conteudo = atob(jsonTSSNewNFse["SIGN_CONSR"]));
    (this.items[13].Conteudo=='' ? this.items[13].Status = '2' : this.items[13].Status = '1');

    (jsonTSSNewNFse["XML_DEPARA"]==undefined ? this.items[14].Conteudo ='' : this.items[14].Conteudo = JSON.stringify(JSON.parse(atob(jsonTSSNewNFse["XML_DEPARA"])),null, 4));
    (this.items[14].Conteudo=='' ? this.items[14].Status = '2' : this.items[14].Status = '1');

    }


    validaCampo(event){

      if(event.length < 7 && event.length > 0  ){
       // alert("Digite um código IBGE válido, com 7 dígitos.");
        this.apiIbge(event);
      }else if(event.length == 7){
        this.onClick_Pesquisa(event);
      };
    }

    onBack() {
      this.router.navigate(['/home']);
    }

    public actions = [
      { action: this.onBack.bind(this), icon: 'po-icon po-icon-home' },
    ];

      ClearScreen(){
        //Limpando os campos da Tela
        //sessionStorage.removeItem( "CodMunIBGE" );
        this.Municipio = '';
        this.xmlUnico3.DESC_MUN = '';
        this.xmlUnico3.UF = '';
        this.xmlUnico3.VERSAO = '';
        for(let i = 0; i<= this.items.length; i++){
          this.items[i].Conteudo = '';
          this.items[i].Status = '2'
        }
      }

  onClick_Export(){

    const Kaic = this.items.map( newItens =>{
        console.log( newItens.Modelo +": " + newItens.Conteudo);
        this.ArrayItemsExport.push(  `"${newItens.Modelo}": ${newItens.Conteudo}\n`)
    } );

    const luna = JSON.stringify( this.ArrayItemsExport );
    this.blod = new Blob( this.ArrayItemsExport , { type: "application/json"  });
    //this.blod = new Blob( [JSON.stringify(this.luna, null, 2)] , { type: "application/json"  });

    const element = document.createElement('a');
    element.href = window.URL.createObjectURL(this.blod);
    element.download = `${this.Municipio}_${this.xmlUnico3.DESC_MUN}_${this.xmlUnico3.UF}\n`;
    element.click();

    window.URL.revokeObjectURL( this.blod );
    element.remove();
    this.ArrayItemsExport.length = 0;
  }

}
