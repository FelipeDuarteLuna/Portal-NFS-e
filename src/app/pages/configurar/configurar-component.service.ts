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
        Conteudo: '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><mConsultaLoteRPS xmlns="http://tempuri.org/"><remessa>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot; ?&gt;&lt;ConsultarLoteRpsEnvio xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot; xmlns:xsd=&quot;http://www.w3.org/2001/XMLSchema&quot; xmlns=&quot;http://www.abrasf.org.br/nfse.xsd&quot;&gt;&lt;Prestador&gt;&lt;CpfCnpj&gt;&lt;Cnpj&gt;89042642000167&lt;/Cnpj&gt;&lt;/CpfCnpj&gt;&lt;RazaoSocial&gt;M D MOVEIS LTDA&lt;/RazaoSocial&gt;&lt;InscricaoMunicipal&gt;1859&lt;/InscricaoMunicipal&gt;&lt;/Prestador&gt;&lt;Protocolo&gt;89042642000167000000033&lt;/Protocolo&gt;&lt;/ConsultarLoteRpsEnvio&gt;</remessa><cabecalho>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;&lt;cabecalho xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot; xmlns:xsd=&quot;http://www.w3.org/2001/XMLSchema&quot; versao=&quot;20.01&quot; xmlns=&quot;http://www.abrasf.org.br/nfse.xsd&quot;&gt;&lt;versaoDados&gt;20.01&lt;/versaoDados&gt;&lt;/cabecalho&gt;</cabecalho></mConsultaLoteRPS></soap:Body></soap:Envelope>',
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
        Status: '3',
        Conteudo: '',
        Modelo: 'Cancelamento',
        Detalhes: 'configurar/Cancelamento',
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
