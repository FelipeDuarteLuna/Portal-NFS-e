import { Component, OnInit } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';
import { IRps } from './rps';
import { RpsService } from './rps.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PageDefault } from '../page-default/PageDefault';
import { ConversionUtils } from 'turbocommons-ts';



@Component({
  selector: 'app-rps',
  templateUrl: './rps.component.html',
  styleUrls: ['./rps.component.scss'],
  providers: [RpsService]
})

export class RpsComponent implements OnInit {

  menuItemSelected: string;
  municipio: string;
  codMunicipio: string;
  versao: string;
  provedor: string;
  xmlUnico: any = '';
  xmlPrefeitura: any = '';
  nomeMetodo: string;

  private sub: any;
  id: string;

  xmlUnico3: IRps = {};
  xmlApiPost: PageDefault = {};

  codeEditor: string;
  language: string;
  properties: Array<string>;
  theme: string;
  editar: boolean;
  nav: any;

  constructor(
      private RpsService: RpsService,
      private location: Location,
      private router: Router,
      private route: ActivatedRoute // Classe para obter parâmetros, da rota ativa.
    ) {

    this.nav = this.router.getCurrentNavigation().extras.state;
    console.log("hi", !this.nav);
    if(!this.nav) {
      console.log('errou')
      const navStorage = localStorage.getItem('config-nav');
      console.log(JSON.parse(navStorage));

      this.nav = JSON.parse(navStorage);
    }

      console.log('entrei no rps');
      console.log('entrei no PAGE DEFAULT ngOnInit, nav:', this.nav);
      console.log(ConversionUtils.stringToBase64('hello'));
      this.municipio = this.nav.Municipio;
      this.codMunicipio = this.nav.codMunicipio;
      this.versao = this.nav.Versao;
      this.provedor = this.nav.Provedor;
      this.nomeMetodo = this.nav.metodo;
      this.xmlPrefeitura = this.nav.conteudoXml;
      localStorage.setItem('config-nav', JSON.stringify(this.nav));

      this.xmlUnico =  this.RpsService.getXmlUnico(this.nomeMetodo);
      console.log(ConversionUtils.stringToBase64('<OI>'));
      console.log( btoa("<OI>") );
      console.log(ConversionUtils.base64ToString('hello'));
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']
      if(this.id) {
        localStorage.setItem('config-item', this.id)
        //this.menuItemSelected = `Configurar > ${this.id}`;
        this.menuItemSelected = "Configurar > RPS";

      } else {
        const nav = localStorage.getItem('config-nav');
        const id = localStorage.getItem('config-item');
        console.log({id});
      }

      this.menuItemSelected = "Configurar > RPS";

    });

    this.restore();

    //this.RpsService.list().subscribe(dadosjson => this.xmlUnico3 = dadosjson);

    if( this.xmlPrefeitura == '' || this.xmlPrefeitura == null  || this.xmlPrefeitura == undefined ){
      console.log("api do RENAN");
      this.RpsService.list().subscribe((jsonTSSNewNFse: IRps) => {

        console.log('jsonTSSNewNFse', jsonTSSNewNFse.cod_mun);
        this.xmlUnico3.municipio = jsonTSSNewNFse.municipio;
        this.xmlUnico3.cod_mun = jsonTSSNewNFse.cod_mun;
        this.xmlUnico3.provedor= jsonTSSNewNFse.provedor;
        this.xmlUnico3.versao= jsonTSSNewNFse.versao;
        this.xmlUnico3.modelo= jsonTSSNewNFse.modelo;
        this.xmlUnico3.xmlTss= atob(jsonTSSNewNFse.xmlTss);
        this.xmlUnico3.xmlPrefeitura = atob(jsonTSSNewNFse.xmlPrefeitura);
      }, error =>{
        this.RpsService.handleError(error)
      });
    }

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
    this.RpsService.showAlertSucess("Botão habilitado para EDIÇÃO do  .XML."),
    this.editar = false;
  }

  ToSave(event){
    console.log(event);
    console.log( this.xmlPrefeitura);
    this.xmlApiPost.municipio = this.municipio;
    this.xmlApiPost.cod_mun = this.codMunicipio;
    this.xmlApiPost.versao = this.versao;
    this.xmlApiPost.ativo = "S";
    this.xmlApiPost.provedor = this.provedor;
    this.xmlApiPost.xmlTss = btoa( this.xmlUnico );

    if( this.nomeMetodo !== null && this.nomeMetodo !== undefined ){

      if ( this.nomeMetodo.toUpperCase() == "RPS" ) {
      this.xmlApiPost.xml_rps = btoa( this.xmlPrefeitura );
      }
    }

    this.RpsService.post(this.xmlApiPost).subscribe(
      success =>{
        this.RpsService.showAlertSucess("Requisição Post, realizada com sucesso.");
        setTimeout(() => {
          this.location.back();
        }, 2000 );
      },
      error =>{
        this.RpsService.handleError(error)
      }, () => console.log('Request completado com sucesso.')
    );

  }

}
