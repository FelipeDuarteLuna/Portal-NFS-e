import { Injectable } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';

@Injectable()

export class SamplePoTableTransportService {

  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'Modelo', type: 'string', width: '18%'},
      { property: 'Conteudo',type:'string', width:'60%' },
      { property: 'Status', type: 'label',  width: '15%',
        labels: [
          { value: '1', color: 'color-10', label: ' Concluido' },
          { value: '2', color: 'color-08', label: ' Pendente .' },
          { value: '3', color: 'color-07', label: ' Cancelado' }
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
        Status: '2',
        Detalhes: '/Provedor',
      },
      {
        Status: '1',
        Conteudo: '',
        Modelo: 'Modelo',
        Detalhes: '/Modelo',
      },
      {
        Status: '1',
        Conteudo: '',
        Modelo: 'Lote',
        Detalhes: '/lote',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'RPS',
        Detalhes: '/rps',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'Consulta Lote',
        Detalhes: '/',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'Consulta RPS',
        Detalhes: '/',
      },
      {
        Status: '3',
        Conteudo: '',
        Modelo: 'Cancelamento',
        Detalhes: '/',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'wsdl Producao',
        Detalhes: '/',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'wsdl Homologacao',
        Detalhes: '/',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'Sign Lote',
        Detalhes: '/',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'Sign Rps',
        Detalhes: '/',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'Sign Canc',
        Detalhes: '/',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'Sign Cons',
        Detalhes: '/',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'De Para',
        Detalhes: '/',
      }
    ];
  }
}
