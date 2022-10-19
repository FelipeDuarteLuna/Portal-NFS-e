import { Injectable } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';

@Injectable()
export class SamplePoTableTransportService {
  favorite: any;
  edit: any;
  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'Modelo', type: 'string', width: '10%'},
      { property: 'Conteudo',type:'string', width:'60%' },
      { property: 'Status', type: 'label',  width: '8%',
        labels: [
          { value: '1', color: 'color-11', label: 'Concluido' },
          { value: '2', color: 'color-08', label: 'Pendente' },
          { value: '3', color: 'color-07', label: 'Cancelado' }
        ]
      },
      { property: '', type: 'link', width: '1%'},
    ];

  }

  getItems(): Array<any> {
    return [
      {
        Modelo: 'Provedor',
        Conteudo: '',
        Status: '1',
        Detalhes: 'Detalhes',
      },
      {
        Status: '1',
        Conteudo: '',
        Modelo: 'Modelo',
        Detalhes: 'Detalhes',
      },
      {
        Status: '1',
        Conteudo: '',
        Modelo: 'Lote',
        Detalhes: 'Detalhes',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'RPS',
        Detalhes: 'Detalhes',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'Consulta Lote',
        Detalhes: 'Detalhes',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'Consulta RPS',
        Detalhes: 'Detalhes',
      },
      {
        Status: '3',
        Conteudo: '',
        Modelo: 'Cancelamento',
        Detalhes: 'Detalhes',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'wsdl Producao',
        Detalhes: 'Detalhes',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'wsdl Homologacao',
        Detalhes: 'Detalhes',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'Sign Lote',
        Detalhes: 'Detalhes',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'Sign Rps',
        Detalhes: 'Detalhes',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'Sign Canc',
        Detalhes: 'Detalhes',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'Sign Cons',
        Detalhes: 'Detalhes',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'De Para',
        Detalhes: 'Detalhes',
      }
    ];
  }

}
