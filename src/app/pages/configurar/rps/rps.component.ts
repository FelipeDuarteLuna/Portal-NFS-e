import { Component, OnInit } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';
import { RpsService } from './rps.service';

@Component({
  selector: 'app-rps',
  templateUrl: './rps.component.html',
  styleUrls: ['./rps.component.scss'],
})
export class RpsComponent implements OnInit {
  menuItemSelected: string;
  private xmlUnico: string = '';

  constructor() {}

  ngOnInit(): void {
    this.menuItemSelected = 'Configurar > RPS';
    this.xmlUnico
  }

  printMenuAction(menu: PoMenuItem) {
    this.menuItemSelected = menu.label;
    console.log(this);
    console.log('Menu ativo.');
  }
}

