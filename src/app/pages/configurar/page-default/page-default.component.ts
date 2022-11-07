import { Component, OnInit } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';

import { PageDefaultService } from './page-default.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IRps } from '../rps/rps';
import { API } from '../rps/API';
import { PageDefault } from './PageDefault';


@Component({
  selector: 'pageDefault',
  templateUrl: './page-default.component.html',
  styleUrls: ['./page-default.component.scss'],
  providers: [PageDefaultService]
})

export class PageDefaultComponent implements OnInit {

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

  parser = new DOMParser();

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
    console.log("hi", !this.nav);
    if(!this.nav) {
      console.log('errou')
      const navStorage = localStorage.getItem('config-nav');
      console.log(JSON.parse(navStorage));

      this.nav = JSON.parse(navStorage);
    }

      console.log('entrei no rps');
      console.log('entrei no PAGE DEFAULT ngOnInit, nav:', this.nav);
      this.municipio = this.nav.Municipio;
      this.codMunicipio = this.nav.codMunicipio;
      this.versao = this.nav.Versao;
      this.provedor = this.nav.Provedor;
      this.nomeMetodo = this.nav.metodo;
      this.xmlPrefeitura = this.nav.conteudoXml;
      localStorage.setItem('config-nav', JSON.stringify(this.nav));

      this.xmlUnico =  this.PageService.getXmlUnico(this.nomeMetodo);
      // this.router.navigate(['/configurar']);
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
        //this.xmlUnico = this.xmlUnico3.xmlTss;
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
    //alert('Botão para editar . XML.');
    this.PageService.showAlertSucess("Botão habilitado para EDIÇÃO do  .XML."),
    this.editar = false;
  }

  ToSave(event){
    //alert('Botão para SALVAR .XML.');
    console.log(event);
    console.log( this.xmlPrefeitura);
    this.xmlApiPost.municipio = this.municipio;
    this.xmlApiPost.cod_mun = this.codMunicipio;
    this.xmlApiPost.versao = this.versao;
    this.xmlApiPost.ativo = "S";
    this.xmlApiPost.provedor = this.provedor;
    this.xmlApiPost.modelo = this.xmlUnico3.modelo;
    this.xmlApiPost.xml_lote = btoa( this.xmlPrefeitura );
    this.xmlApiPost.xmlTss = btoa( this.xmlUnico3.xmlTss );

    this.PageService.post(this.xmlApiPost).subscribe(
      success =>{
        this.PageService.showAlertSucess("Requisição Post, realizada com sucesso.")
        //this.location.back()
      },
      error =>{
        this.PageService.handleError(error)
      }, () => console.log('Request completado com sucesso.')
    );

  }

}


