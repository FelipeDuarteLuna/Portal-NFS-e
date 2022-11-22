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
          { value: '2', color: 'color-08', label: ' Pendente ' },
          { value: '3', color: 'color-07', label: ' Cancelado' }
        ]
      },
      { property: '', type: 'link', width: '1%'},
    ];

  }

  getItems(): Array<any> {
    return [
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'Provedor',
        Detalhes: 'configurar/Provedor',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'Modelo',
        Detalhes: 'configurar/Modelo',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'Versão',
        Detalhes: 'configurar/Versao',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'Lote',
        Detalhes: 'configurar/Lote',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'RPS',
        Detalhes: 'configurar/rps',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'Consulta Lote',
        Detalhes: 'configurar/Consulta Lote',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'Consulta RPS',
        Detalhes: 'configurar/Consulta RPS',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'Cancelamento',
        Detalhes: 'configurar/Cancelamento',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'Wsdl Produção',
        Detalhes: 'configurar/Wsdl Produção',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'Wsdl Homologação',
        Detalhes: 'configurar/Wsdl Homologação',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'Sign Lote',
        Detalhes: 'configurar/Sign Lote',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'Sign Rps',
        Detalhes: 'configurar/Sign Rps',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'Sign Canc',
        Detalhes: 'configurar/Sign Canc',
      },
      {
        Status: '2',
        Conteudo: '',
        Modelo: 'Sign Cons',
        Detalhes: 'configurar/Sign Cons',
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
