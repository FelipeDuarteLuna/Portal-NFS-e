import { Component, OnDestroy, OnInit } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';

import { PageDefaultService } from './page-default.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IRps } from './rps';
import { PageDefault } from './PageDefault';
import { ConversionUtils } from 'turbocommons-ts';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'pageDefault',
  templateUrl: './page-default.component.html',
  styleUrls: ['./page-default.component.scss'],
  providers: [PageDefaultService]
})

export class PageDefaultComponent implements OnInit, OnDestroy {

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
  private sub2: any;
  private subscriptions: Subscription [] = [] ;

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
      private PageService: PageDefaultService,
      private location: Location,
      private router: Router,
      private route: ActivatedRoute // Classe para obter parâmetros, da rota ativa.
    ) {

    this.nav = this.router.getCurrentNavigation().extras.state;
    if(!this.nav) {
      const navStorage = localStorage.getItem('config-nav');
      this.nav = JSON.parse(navStorage);
    }
      this.municipio = this.nav.Municipio;
      this.uf = this.nav.UF;
      this.codMunicipio = this.nav.codMunicipio;
      this.versao = this.nav.Versao;
      this.provedor = this.nav.Provedor;
      this.nomeMetodo = this.nav.metodo;
      this.xmlPrefeitura = this.nav.conteudoXml;
      localStorage.setItem('config-nav', JSON.stringify(this.nav));
      sessionStorage.setItem('CodMunIBGE', this.codMunicipio);

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
      }
    });

    this.restore();

    this.subscriptions.push( this.sub );
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

    this.editar = false; //this.PageService.showAlertSucess("Botão habilitado para EDIÇÃO do  .XML."),
  }

  ToSave(event){
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
//versão
      }else if ( this.nomeMetodo.toUpperCase() == "VERSAO" ) {
        this.xmlApiPost.VERSAO =  this.xmlPrefeitura ;
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
      } else if (this.nomeMetodo.toUpperCase() == "DE PARA"){
        this.xmlApiPost.XML_DEPARA = btoa( this.xmlPrefeitura );
      }
    }

    this.sub2 = this.PageService.post(this.xmlApiPost).subscribe(
      success =>{
        sessionStorage.setItem('CodMunIBGE', this.codMunicipio);
        this.PageService.showAlertSucess("Gravação realizada com sucesso.");
        setTimeout(() => {
          this.location.back();
        }, 3000 );
      },
      error =>{
      }, () => console.log('Request POST, completado com sucesso.', this.sub2)
    );

    this.subscriptions.push( this.sub2 );
  }

  onBack() {
    this.location.back();
  }

  public actions = [
        { action: this.onBack.bind(this), icon: 'po-icon-news' },
      ];


  ngOnDestroy() {

    this.subscriptions.forEach( ( subscription ) => {

      console.log('ngOnDestroy DESTRIUI, completado com sucesso.', subscription)
      subscription.unsubscribe()
    });
  }

}
