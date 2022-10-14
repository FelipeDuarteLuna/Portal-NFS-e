import { Component } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  widgetClicadoDocumetacao(){
    window.open("https://tdn.totvs.com/pages/releaseview.action?pageId=203771195", '_blank');
  }

  constructor() {}

  /* public HomeService: HomeService
  printMenuAction(menu: PoMenuItem) {
    this.menuItemSelected = menu.label;
    console.log(this);
    console.log('Menu ativo.');
  }*/
}

