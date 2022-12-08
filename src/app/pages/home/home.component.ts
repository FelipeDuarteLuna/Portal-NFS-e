import { Component } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  menuItemSelected: string;

  constructor() {}

  ngOnInit(): void {

    this.menuItemSelected = 'Home'
  }

  printMenuAction(menu: PoMenuItem) {

    this.menuItemSelected = menu.label;
  }

  widgetClicadoDocumetacao(){

    window.open("https://tdn.totvs.com/pages/releaseview.action?pageId=203771195", '_blank');
  }

}

