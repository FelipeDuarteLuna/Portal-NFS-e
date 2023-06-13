[![Build Status](https://drone.engpro.totvs.com.br/api/badges/totvs-gestao-de-vendas/totvs-gestao-de-vendas/status.svg)](https://drone.engpro.totvs.com.br/totvs-tss/Portal-New-NFS-e/)

# :man_technologist::date::bar_chart:	Portal New NFS-e (Linha TSS)

O **Portal New NFS-e (Linha TSS)** é uma plataforma Web para usuários do **TSS** que utilizem Transmissão de NFS-e via Web Service, para gerenciar seu Livro Fiscal com Emissões de NFS-e, controle fiscal e consolidação da receita da organização.

Através do portal o **usuário** irá conseguir implementar uma nova NFS-e do Município em questão para **Transmissão, Consulta e Cancelamento de NFS-e via Web Service**, ou caso necessário irá conseguir presta um auto atendimento. Por exemplo: Caso a prefeitura do Municipío altera a URL do ambiente de Produção ou Assinatura da NFS-e, sem a necessidade de acionar o Suporte TOTVS para adequação da NFS-e.


## :star2: Ambientes

* 🔗 [Homologação](https://tgv-homolog.web.app/#/login) - Ambiente de Homologação


## :earth_americas: BackEnd

A Integração entre o Portal New NFS-e (Linha TSS) com o TSS ocorre via APIs REST (2.0) e estão armazenadas no TFS.

```javascript
$/TSS/V12/Master/Fontes/NFSE/New Nfse/;
```

## :construction: Desenvolvimento

### :wrench: Pré Requisitos

1. Instalar [Node.js](https://nodejs.org/en/).
2. Instalar [Angular CLI](https://www.npmjs.com/package/@angular/cli).
3. Possuir uma base TSS atualizada com pacote de Expedição contíua.  [Portal de Vendas (Linha Protheus): Guia de Referencia - Requisitos](https://tdn.totvs.com/pages/releaseview.action?pageId=579468339#TOTVSGest%C3%A3odeVendas:GuiadeReferencia-REQUISITOS).
5. Instalar projeto

```javascript
npm install
```

### :fire: Iniciando a Aplicação

1. Iniciar o Aplication Server REST Protheus (AppServer).
   1.1. Para utilizar uma conexao com Application Server Local edite a Chave URL no arquivo enviroment.ts

```javascript
export const environment = {
  production: false,
  URL: 'http://localhost:1322/rest/',
  ...
};
```

2. Iniciar aplicação

```javascript
ng serve --open
```

## :white_check_mark: Testes (Front-End)

#### Execução com browse externo apresentado os resultados

```javascript
ng test --browsers=Chrome --code-coverage
```

#### Execução no console

```javascript
ng test --browsers=ChromeHeadless --code-coverage 
```

## Execução de Testes end-to-end

Para executar os testes end-to-end via [Jasmine](https://jasmine.github.io/), utilize:

```javascript
  npm install karma karma-coverage --save-dev
```

## :memo: Documentação

* 🔗 [Portal New NFS-e (Linha TSS): Guia de Referencia](https://tdn.totvs.com/pages/releaseview.action?pageId=579468339)
* 🔗 [Perguntas mais frequentes do Portal New NFS-e](https://tdn.totvs.com/x/Ro2zJg)
* 🔗 [Log de Alterações](https://code.engpro.totvs.com.br/totvs-gestao-de-vendas/totvs-gestao-de-vendas/src/branch/master/CHANGELOG.md)
* 🔗 [O que há de novo ?](https://tdn.totvs.com/pages/releaseview.action?pageId=684340765)

