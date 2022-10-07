import { Component } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';
import { HomeService } from './home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [HomeService],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  menuItemSelected: string;

  menus: Array<PoMenuItem> = [
    { label: 'Home', action: this.printMenuAction.bind(this), icon: 'po-icon po-icon-home', shortLabel: 'Home' },
    {
      label: 'Configurar',
      action: this.printMenuAction.bind(this),
      icon: 'po-icon po-icon-xml',
      shortLabel: 'Configurar',
      badge: { value: 1 }
    },
    {
      label: 'Documentação',
      icon: 'po-icon po-icon-document-filled',
      shortLabel: 'Documentação',
      link:'https://tdn.totvs.com/pages/releaseview.action?pageId=203771195',

    }
  ];

  widgetClicadoDocumetacao(){
    window.open("https://tdn.totvs.com/pages/releaseview.action?pageId=203771195", '_blank');
  }

  constructor(public HomeService: HomeService) {}

  printMenuAction(menu: PoMenuItem) {
    this.menuItemSelected = menu.label;
  }
}

