import { Component } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';
import { HomeService } from './home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [HomeService],
  styles: [
    `
      .sample-menu-header-text-color {
        color: #9da7a9;
      }
    `
  ]
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
      label: 'TssNewNfse',
      icon: 'po-icon po-icon-settings',
      shortLabel: 'TssNewNfse',
      subItems: [
        { label: 'Ministry of Labour', action: this.printMenuAction.bind(this), link: 'http://trabalho.gov.br/' },
        { label: 'SindPD Syndicate', action: this.printMenuAction.bind(this), link: 'http://www.sindpd.com.br/' }
      ]
    },
    {
      label: 'Documentação',
      icon: 'po-icon po-icon-document-filled',
      shortLabel: 'Documentação',
      subItems: [
        {
          label: 'Meal tickets',
          subItems: [
            { label: 'Acceptance network ', action: this.printMenuAction.bind(this) },
            {
              label: 'Extracts',
              action: this.printMenuAction.bind(this),
              subItems: [
                { label: 'Monthly', action: this.printMenuAction.bind(this), badge: { value: 3, color: 'color-03' } },
                { label: 'Custom', action: this.printMenuAction.bind(this) }
              ]
            }
          ]
        },
        { label: 'Transportation tickets', action: this.printMenuAction.bind(this), badge: { value: 12 } }
      ]
    }
  ];

  constructor(public HomeService: HomeService) {}

  printMenuAction(menu: PoMenuItem) {
    this.menuItemSelected = menu.label;
  }
}

