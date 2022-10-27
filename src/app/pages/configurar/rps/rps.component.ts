import { API } from './API';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';
import { IRps } from './rps';
import { RpsService } from './rps.service';
import { Location } from '@angular/common';


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
  xmlApiPost: API = {};

  xmlUnico3$ :Observable<IRps>; // VariavÃƒÆ’Ã‚Â©l observable


  parser = new DOMParser();

  codeEditor: string;
  language: string;
  properties: Array<string>;
  theme: string;
  editar: boolean;

  constructor(
      private RpsService: RpsService,
      private location: Location
    ) {


    //this.xmlUnico =  this.RpsService.getXmlUnico();


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

    //this.RpsService.list().subscribe(dadosjson => this.xmlUnico3 = dadosjson);

    this.RpsService.list().subscribe((jsonTSSNewNFse: IRps) => {

      console.log('jsonTSSNewNFse', jsonTSSNewNFse.cod_mun);
      this.xmlUnico3.municipio = jsonTSSNewNFse.municipio;
      this.xmlUnico3.cod_mun = jsonTSSNewNFse.cod_mun;
      this.xmlUnico3.provedor= jsonTSSNewNFse.provedor;
      this.xmlUnico3.versao= jsonTSSNewNFse.versao;
      this.xmlUnico3.modelo= jsonTSSNewNFse.modelo;
      this.xmlUnico3.xmlTss= atob(jsonTSSNewNFse.xmlTss);
      this.xmlUnico3.xmlPrefeitura = atob(jsonTSSNewNFse.xmlPrefeitura);
      this.xmlUnico = this.xmlUnico3.xmlTss;
    }, error =>{
      this.RpsService.handleError(error)
    });


    //this.xmlUnico3$ = this.RpsService.list();
    //console.log(this.xmlUnico3$);

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
    //alert('Botão para editar . XML.');
    this.RpsService.showAlertSucess("Botão habilitado para EDIÇÃO do  .XML."),
    this.editar = false;
  }

  ToSave(event){
    //alert('Botão para SALVAR .XML.');
    console.log(event);
    console.log(this.xmlUnico3.xmlTss);
    this.xmlApiPost.municipio = this.xmlUnico3.municipio;
    this.xmlApiPost.cod_mun = this.xmlUnico3.cod_mun;
    this.xmlApiPost.versao = this.xmlUnico3.versao;
    this.xmlApiPost.ativo = "S";
    this.xmlApiPost.provedor = this.xmlUnico3.provedor;
    this.xmlApiPost.modelo = this.xmlUnico3.modelo;
    this.xmlApiPost.xml_rps = btoa( this.xmlUnico3.xmlPrefeitura );
    this.xmlApiPost.xmlTss = btoa( this.xmlUnico3.xmlTss );

    this.RpsService.post(this.xmlApiPost).subscribe(
      success =>{
        this.RpsService.showAlertSucess("RequisiÇão Post, realizada com sucesso.")
        //this.location.back()
      },
      error =>{
        this.RpsService.handleError(error)
      }, () => console.log('Request completado com sucesso.')
    );

  }

}

