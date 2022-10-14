import { HttpClient } from '@angular/common/http';
import { Injectable, Component } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';

@Injectable()

export class ConfigurarService {
  constructor(private http: HttpClient) {}
  filter(filters) {
    let filteredItems = [...this.getItems()];

    Object.keys(filters).forEach(filter => {
      filteredItems = filteredItems.filter(register => {
        if (typeof register[filter] === 'string') {
          return register[filter].toLocaleLowerCase().includes(filters[filter].toLocaleLowerCase());
        } else {
          return register[filter] === filters[filter];
        }
      });
    });

    return filteredItems;

  }

  getColumns(): Array<PoTableColumn> {
    return [

      { property: 'Modelo', label: 'Modelo', type: 'string' },
      { property: 'Conteudo', label: 'Conteúdo', type: 'string' },
      { property: 'hireStatus',
        label: 'Status',
        type: 'subtitle',
        subtitles: [
          { value: '1', color: 'success', label: 'Concluí­do', content: 'ConcluÃ­do' },
          { value: '2', color: 'warning', label: 'Pendente', content: 'Pendente' },
          { value: '3', color: 'danger', label: 'Cancelado', content: 'Cancelado' }
        ]
      }
    ];
  }

  getHireStatus() {
    return [
      { value: '1', label: 'Confirmado' },
      { value: '2', label: 'Pendente' },
      { value: '3', label: 'Cancelado' }
    ];
  }

  getItems() {
    return [
      {
        hireStatus: '1',
        Conteudo: '',
        Modelo: 'Provedor',
        job: 'Provedor',
      },
      {
        hireStatus: '2',
        Conteudo: '',
        Modelo: 'Modelo',
        job: 'Modelo',
      },
      {
        hireStatus: '3',
        Conteudo: '',
        Modelo: 'Lote',
        job: 'Lote',
      },
      {
        hireStatus: '2',
        Conteudo: '',
        Modelo: 'RPS',
        job: 'RPS',
      },
      {
        hireStatus: '1',
        Conteudo: '',
        Modelo: 'Consulta Lote',
        job: 'Consulta Lote',
      },
      {
        hireStatus: '2',
        Conteudo: '',
        Modelo: 'Consulta RPS',
        job: 'Consulta RPS',
      },
      {
        hireStatus: '1',
        Conteudo: '',
        Modelo: 'Cancelamento',
        job: 'Cancelamento',
      },
      {
        hireStatus: '2',
        Conteudo: '',
        Modelo: 'wsdl Produção',
        job: 'wsdl Producao',
      },
      {
        hireStatus: '2',
        Conteudo: '',
        Modelo: 'wsdl Homologação',
        job: 'wsdl Homologação',
      },
      {
        hireStatus: '2',
        Conteudo: '',
        Modelo: 'Sign Lote',
        job: 'Sign Lote',
      },
      {
        hireStatus: '2',
        Conteudo: '',
        Modelo: 'Sign Rps',
        job: 'Sign Rps',
      },
      {
        hireStatus: '2',
        Conteudo: '',
        Modelo: 'Sign Canc',
        job: 'Sign Canc',
      },
      {
        hireStatus: '2',
        Conteudo: '',
        Modelo: 'Sign Cons',
        job: 'Sign Cons',
      },
      {
        hireStatus: '2',
        Conteudo: '',
        Modelo: 'De Para',
        job: 'De Para',
      }
    ];
  }

  resetFilterHiringProcess() {
    return [...this.getItems()];
  }

  getPageOptions() {
    return {

    };
  }

}
