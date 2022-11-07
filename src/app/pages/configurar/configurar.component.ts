import { SamplePoTableTransportService } from './configurar-component.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { PoMenuItem, PoSelectOption, PoTableAction, PoTableColumn } from '@po-ui/ng-components';

@Component({
  selector: 'app-configurar',
  templateUrl: './configurar.component.html',
  styleUrls: ['./configurar.component.scss'],
  providers: [SamplePoTableTransportService]
})

export class ConfigurarComponent implements OnInit{
  menuItemSelected: string;
  columns: Array<PoTableColumn>;
  items: Array<any>;
  codMunicipio: String;

  Detalhes: Array<PoTableAction> = [
    {label:"Detalhes", action: this.onClick_Detalhes.bind(this) }

    /*{label:"Visualizar"}*/
  ];

  readonly statusOptions: Array<PoSelectOption> = [
    { label: '1', value: 'concluido' },
    { label: '2', value: 'pendente' },
    { label: '3', value: 'cancelado' }
  ];

    constructor(private transportService: SamplePoTableTransportService, private router: Router) {}

    ngOnInit() {
      this.columns = this.transportService.getColumns();
      this.items = this.transportService.getItems();
      this.menuItemSelected = 'Configurar > Modelo';
      this.codMunicipio = "2102101";
    }
    printMenuAction(menu: PoMenuItem) {
      this.menuItemSelected = menu.label;
      console.log(this);
      console.log('Menu ativo.');
    }

//Tratamento botao home
  onClick_Home() {
    this.router.navigate(['/home']);
  }
//Chamado Detalhes Configurar
  onClick_Detalhes(Event){
    console.log(' onClick_Detalhes, event: ', Event)
    // this.router.navigate([Event.Detalhes], { state: { tituloPagina: Event.Modelo} });
    console.log(Event.Detalhes);
    this.router.navigate([Event.Detalhes],
       { state: { metodo: Event.Modelo, conteudoXml: Event.Conteudo, codMunicipio: this.codMunicipio, Municipio: "Brejo - MA",
                  Versao: "1.00", Provedor: "Renan s2 Lucia <3" } });
  }

}
