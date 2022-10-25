import { Component, OnInit } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';
import { IRps } from './rps';
import { RpsService } from './rps.service';


@Component({
  selector: 'app-rps',
  templateUrl: './rps.component.html',
  styleUrls: ['./rps.component.scss'],
  providers: [RpsService]
})
export class RpsComponent implements OnInit {

  menuItemSelected: string;
  xmlUnico: any = '';
  xmlUnico3: IRps = {};
  versao: string;


  parser = new DOMParser();

  codeEditor: string;
  language: string;
  properties: Array<string>;
  theme: string;
  editar: boolean;

  constructor(private RpsService: RpsService) {

    this.xmlUnico =  this.RpsService.getXmlUnico();


    //this.xmlUnico = this.parser.parseFromString( this.RpsService.getXmlUnico(), "text/xml");
    //this.xmlUnico3 = this.parser.parseFromString( this.RpsService.getXmlUnico(), "application/xml")
    //this.xmlUnico2 = this.parser.parseFromString( this.RpsService.getXmlUnico(), "text/html");
    //this.xmlUnico4 = this.parser.parseFromString( this.RpsService.getXmlUnico(), "application/xhtml+xml");
    //console.log(this.xmlUnico3.documentElement.innerHTML);
    //console.log(this.xmlUnico3.documentElement.outerHTML);
  }

  ngOnInit(): void {
    this.menuItemSelected = 'Configurar > RPS';

    this.restore();

    /*this.RpsService.list().subscribe((jsonTSSNewNFse: any) => {
      this.xmlUnico = atob(jsonTSSNewNFse.municipios[0].xml_rps);
      //console.log('jsonTSSNewNFse', jsonTSSNewNFse.municipios[0].xml_rps);
      //console.log('jsonTSSNewNFse', jsonTSSNewNFse);
    });*/


    this.RpsService.list().subscribe((jsonTSSNewNFse: IRps) => {

      console.log('jsonTSSNewNFse', jsonTSSNewNFse.cod_mun);
      this.xmlUnico3.municipio = jsonTSSNewNFse.municipio;
      this.xmlUnico3.cod_mun = jsonTSSNewNFse.cod_mun;
      this.xmlUnico3.provedor= jsonTSSNewNFse.provedor;
      this.xmlUnico3.versao= jsonTSSNewNFse.versao;
      this.xmlUnico3.modelo= jsonTSSNewNFse.modelo;
      this.xmlUnico3.xmlTss= atob(jsonTSSNewNFse.xmlTss);
      //this.xmlUnico3.municipio[0].xml_rps = atob(jsonTSSNewNFse.municipio[0].xml_rps);
      //console.log('jsonTSSNewNFse', jsonTSSNewNFse.municipio[0].cod_mun);
      //console.log('jsonTSSNewNFse', jsonTSSNewNFse.municipio[0].versao);
      //console.log('jsonTSSNewNFse', jsonTSSNewNFse.municipio[0].provedor);
      //console.log('jsonTSSNewNFse', jsonTSSNewNFse.municipio[0].xml_rps);
      //console.log('jsonTSSNewNFse', jsonTSSNewNFse.municipio[0].xml_canc);
      //console.log('jsonTSSNewNFse', jsonTSSNewNFse.municipios[0].xml_rps);
    });
  }

  printMenuAction(menu: PoMenuItem) {
    this.menuItemSelected = menu.label;
    console.log(this);
    console.log('Menu ativo.');
  }

  restore() {
    this.language = 'xml';
    this.theme = 'vs'; // vs vs-dark hc-black
    this.properties = [];
    this.codeEditor = '';
    this.editar = true;
  }

  ToEdit(){
    console.log('Botão para editar . XML.');
    alert('Botão para editar . XML.');
    this.editar = false;
  }

  ToSave(event){
    alert('Botão para SALVAR .XML.');
    console.log(event);
    console.log(this.xmlUnico);

  }

}

