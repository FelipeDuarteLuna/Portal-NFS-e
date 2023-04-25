import { MenuService } from 'src/app/app.service';
import { Component, OnInit } from '@angular/core';
import { PoMenuItem, PoToolbarAction, PoToolbarProfile, PoDialogModule, PoDialogConfirmLiterals, PoDialogService } from '@po-ui/ng-components';
import { AuthService } from './login/auth.service';
import { AuthGuard } from './core/auth/auth.guard';
import { ProAppConfigService } from '@totvs/protheus-lib-core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [MenuService],
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title = 'Portal-Nfse';
  menuItemSelected: string;

  mostraMenu: boolean = true;

  menus: Array<PoMenuItem> = [
    {
      label: 'Home',
      action: this.printMenuAction.bind(this),
      icon: 'po-icon po-icon-home',
      shortLabel: 'Home',
      link: '/home'
    },
    {
      label: 'Configurar',
      action: this.printMenuAction.bind(this),
      icon: 'po-icon po-icon-xml',
      shortLabel: 'Configurar',
      link: '/configurar'
    },
    {
      label: 'Documentação',
      icon: 'po-icon po-icon-document-filled',
      shortLabel: 'Documentação',
      link:'https://tdn.totvs.com/pages/releaseview.action?pageId=203771195',

    }
  ];

  profile: PoToolbarProfile = {
    title: 'Portal TSS'
  };

  actions: Array<PoToolbarAction> = [
    {label:"Sair",icon: "po-icon po-icon-exit", type:"danger" , action: this.dialogConfirm.bind(this) }
  ];


  constructor( private authService: AuthService,
    private authGuard: AuthGuard,
    public MenuService: MenuService,
    private protheusLibCore: ProAppConfigService,
    public poDialog: PoDialogService,
    private protheusAppService: ProAppConfigService ) {

  }

  ngOnInit(){
    this.authGuard.mostraMenuEmit.subscribe(
      mostra => this.mostraMenu = mostra
    );

    this.protheusLibCore.loadAppConfig();
  }

  widgetClicadoDocumetacao(){

    window.open("https://tdn.totvs.com/pages/releaseview.action?pageId=203771195", '_blank');
  }

  printMenuAction(menu: PoMenuItem) {

    this.menuItemSelected = menu.label;
  }

  dialogAvatarToolbar(){

      this.poDialog.confirm({
        literals: { cancel: 'Não', confirm: 'Sim' },
        title: "Portal TSS",
        message: "Deseja sair ?",
        confirm: () => this.dialogConfirm()
      });
  }

  dialogConfirm(){

    this.protheusAppService.callAppClose();1
  }
}

