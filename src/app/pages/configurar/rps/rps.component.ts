import { Component, OnDestroy, OnInit } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';
import { IRps } from './rps';
import { RpsService } from './rps.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PageDefault } from '../page-default/PageDefault';
import { ConversionUtils } from 'turbocommons-ts';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-rps',
  templateUrl: './rps.component.html',
  styleUrls: ['./rps.component.scss'],
  providers: [RpsService]
})

export class RpsComponent implements OnInit, OnDestroy {

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
      private RpsService: RpsService,
      private location: Location,
      private router: Router,
      private route: ActivatedRoute // Classe para obter parâmetros, da rota ativa.
    ) {

    this.nav = this.router.getCurrentNavigation().extras.state;
    if(!this.nav) {
      const navStorage = sessionStorage.getItem('config-nav');
      this.nav = JSON.parse(navStorage);
    }
      this.municipio = this.nav.Municipio;
      this.uf = this.nav.UF;
      this.codMunicipio = this.nav.codMunicipio;
      this.versao = this.nav.Versao;
      this.provedor = this.nav.Provedor;
      this.nomeMetodo = this.nav.metodo;
      this.xmlPrefeitura = this.nav.conteudoXml;
      sessionStorage.setItem('config-nav', JSON.stringify(this.nav));
      sessionStorage.setItem('CodMunIBGE', this.codMunicipio);

      this.xmlUnico =  this.RpsService.getXmlUnico(this.nomeMetodo);
      console.log(ConversionUtils.stringToBase64('<OI>'));
      console.log( btoa("<OI>") );
      console.log(ConversionUtils.base64ToString('hello'));
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']
      if(this.id) {
        sessionStorage.setItem('config-item', this.id)
        this.menuItemSelected = "Configurar > RPS";
      } else {
        const nav = sessionStorage.getItem('config-nav');
        const id = sessionStorage.getItem('config-item');
      }
      this.menuItemSelected = "Configurar > RPS";
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

    this.editar = false;
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

      if ( this.nomeMetodo.toUpperCase() == "RPS" ) {
      this.xmlApiPost.XML_RPS = btoa( this.xmlPrefeitura );
      }
    }

    this.sub2 = this.RpsService.post(this.xmlApiPost).subscribe(
      success =>{
        sessionStorage.setItem('CodMunIBGE', this.codMunicipio);
        this.RpsService.showAlertSucess("Gravação realizada com sucesso.");
        setTimeout(() => {
          this.location.back();
        }, 3000 );
      },
      error =>{
      }, () => console.log('Request POST, completado com sucesso.', this.sub2)
    );

    this.subscriptions.push( this.sub2 );
  }

  ngOnDestroy() {

    this.subscriptions.forEach( ( subscription ) => {

      console.log('ngOnDestroy DESTRIUI, completado com sucesso.', subscription)
      subscription.unsubscribe()
    });
  }

}
