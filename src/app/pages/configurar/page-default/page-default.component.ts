import { ConfigurarComponent } from './../configurar.component';
import { Component, OnInit } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';

import { PageDefaultService } from './page-default.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IRps } from '../rps/rps';
import { PageDefault } from './PageDefault';
import { ConversionUtils } from 'turbocommons-ts';
import { PoLoadingModule } from '@po-ui/ng-components';
import { ConfigurarModule } from '../configurar.module';
import { SamplePoTableTransportService } from '../configurar-component.service';
import { ConfigurarApi } from '../configurar.service';



@Component({
  selector: 'pageDefault',
  templateUrl: './page-default.component.html',
  styleUrls: ['./page-default.component.scss'],
  providers: [PageDefaultService]
})

export class PageDefaultComponent implements OnInit {

  menuItemSelected: string;
  municipio: string;
  uf: string;
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

  //isLoading = true;


  constructor(
      private PageService: PageDefaultService,
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
      this.uf = this.nav.UF;
      this.codMunicipio = this.nav.codMunicipio;
      this.versao = this.nav.Versao;
      this.provedor = this.nav.Provedor;
      this.nomeMetodo = this.nav.metodo;
      this.xmlPrefeitura = this.nav.conteudoXml;
      localStorage.setItem('config-nav', JSON.stringify(this.nav));

      this.xmlUnico =  this.PageService.getXmlUnico(this.nomeMetodo);
      console.log(ConversionUtils.stringToBase64('<OI>'));
      console.log( btoa("<OI>") );
      console.log(ConversionUtils.base64ToString('hello'));
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']
      if(this.id) {
        localStorage.setItem('config-item', this.id)
        this.menuItemSelected = `Configurar > ${this.id}`;

      } else {
        const nav = localStorage.getItem('config-nav');
        const id = localStorage.getItem('config-item');
        console.log({id});
      }

    });

    this.restore();

    if( this.xmlPrefeitura == '' || this.xmlPrefeitura == null  || this.xmlPrefeitura == undefined ){
      console.log("api do RENAN");
      this.PageService.list().subscribe((jsonTSSNewNFse: IRps) => {

        console.log('jsonTSSNewNFse', jsonTSSNewNFse.cod_mun);
        this.xmlUnico3.municipio = jsonTSSNewNFse.municipio;
        this.xmlUnico3.cod_mun = jsonTSSNewNFse.cod_mun;
        this.xmlUnico3.provedor= jsonTSSNewNFse.provedor;
        this.xmlUnico3.versao= jsonTSSNewNFse.versao;
        this.xmlUnico3.modelo= jsonTSSNewNFse.modelo;
        this.xmlUnico3.xmlTss= atob(jsonTSSNewNFse.xmlTss);
        this.xmlUnico3.xmlPrefeitura = atob(jsonTSSNewNFse.xmlPrefeitura);
      }, error =>{
        this.PageService.handleError(error)
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
    this.PageService.showAlertSucess("Botão habilitado para EDIÇÃO do  .XML."),
    this.editar = false;
  }

  ToSave(event){
    //this.isLoading = false;
    console.log(event);
    console.log( this.xmlPrefeitura);
    this.xmlApiPost.DESC_MUN = this.municipio;
    this.xmlApiPost.UF = this.uf;
    this.xmlApiPost.COD_MUN = this.codMunicipio;
    this.xmlApiPost.VERSAO = this.versao;
    this.xmlApiPost.ATIVO = "S";
    this.xmlApiPost.PROVEDOR = this.provedor;
    this.xmlApiPost.XML_TSS = btoa( this.xmlUnico );

    if( this.nomeMetodo !== null && this.nomeMetodo !== undefined ){

      if ( this.nomeMetodo.toUpperCase() == "PROVEDOR" ){
        this.xmlApiPost.PROVEDOR = this.xmlPrefeitura ;
      }else if ( this.nomeMetodo.toUpperCase() == "MODELO" ) {
        this.xmlApiPost.MODELO =  this.xmlPrefeitura ;
      } else if ( this.nomeMetodo.toUpperCase() == "LOTE" ) {
        this.xmlApiPost.XML_LOTE = btoa( this.xmlPrefeitura );
      } else if ( this.nomeMetodo.toUpperCase() == "RPS" ) {
      this.xmlApiPost.XML_RPS = btoa( this.xmlPrefeitura );
      } else if ( this.nomeMetodo.toUpperCase() == "CONSULTA LOTE" ) {
      this.xmlApiPost.XMLCONSLOT = btoa( this.xmlPrefeitura );
      } else if ( this.nomeMetodo.toUpperCase() == "CONSULTA RPS" ) {
      this.xmlApiPost.XMLCONSRPS = btoa( this.xmlPrefeitura );
      } else if ( this.nomeMetodo.toUpperCase() == "CANCELAMENTO" ) {
        this.xmlApiPost.XML_CANC = btoa( this.xmlPrefeitura );
      }else if ( this.nomeMetodo.toUpperCase() == "WSDL PRODUÇÃO" ) {
        this.xmlApiPost.WSDL_PROD = btoa( this.xmlPrefeitura );
      } else if ( this.nomeMetodo.toUpperCase() == "WSDL HOMOLOGAÇÃO" ) {
        this.xmlApiPost.WSDL_HOMO = btoa( this.xmlPrefeitura );
      } else if ( this.nomeMetodo.toUpperCase() == "SIGN LOTE" ) {
        this.xmlApiPost.SIGN_LOTE = btoa( this.xmlPrefeitura );
      } else if ( this.nomeMetodo.toUpperCase() == "SIGN RPS" ) {
        this.xmlApiPost.SIGN_RPS = btoa( this.xmlPrefeitura );
      } else if ( this.nomeMetodo.toUpperCase() == "SIGN CANC" ) {
        this.xmlApiPost.SIGN_CANC = btoa( this.xmlPrefeitura );
      } else if ( this.nomeMetodo.toUpperCase() == "SIGN CONS" ) {
        this.xmlApiPost.SIGN_CONSR =  btoa( this.xmlPrefeitura );
      }
    }

    this.PageService.post(this.xmlApiPost).subscribe(
      success =>{
        //this.isLoading = true;
        this.PageService.showAlertSucess("Requisição Post, realizada com sucesso.");
        setTimeout(() => {
          this.location.back();
        }, 2000 );

      },
      error =>{
        //this.isLoading = true;
        this.PageService.handleError(error)
      }, () => console.log('Request completado com sucesso.')
    );

  }

}


