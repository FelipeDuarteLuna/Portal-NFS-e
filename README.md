[![Build Status](https://drone.engpro.totvs.com.br/api/badges/totvs-gestao-de-vendas/totvs-gestao-de-vendas/status.svg)](https://drone.engpro.totvs.com.br/totvs-tss/Portal-New-NFS-e/)

# :man_technologist::date::bar_chart:	Portal New NFS-e (Linha TSS)

O **Portal New NFS-e (Linha TSS)** é uma plataforma disponibilizada para usuários do **TSS** com intuito de auxilixar na Implementação, Controle e Manutenção no Layout do Documento Fiscal de Serviço(NFS-e) do Município que deseja Transmitir via Web Service.
 
Através do portal o **usuário** irá conseguir implementar uma nova NFS-e do Município em questão para **Transmissão, Consulta e Cancelamento de NFS-e via Web Service**, ou caso necessário irá conseguir presta um auto atendimento. Por exemplo: Caso a prefeitura do Municipío altera a URL do ambiente de Produção ou Assinatura da NFS-e, sem a necessidade de acionar o Suporte TOTVS para adequação da NFS-e.


## :star2: Acessando Portal New NFS-e

Para acessar o Portal New NFS-e o usuário deve acessar o **TSS Interface**, portal foi disponibilizado tanto para o Adminstrador quanto para os usuários cadastrados. Foi criado uma nova opção no menu com nome "Portal NEW NFS-e". Para o correto funcionamento do **Portal New NFS-e habilitar Porta Multiprotocolo e configurar Comunicação REST**.



* 🔗 [Acessando Portal New NFS-e](https://tdn.totvs.com/pages/releaseview.action?pageId=775483319) - Acesse a Documentação Portal NFS-e: Guia de Refêrencia, sessão **Portal New NFS-e - Exemplo de Utilização**.


## :earth_americas: BackEnd

A Integração entre o Portal New NFS-e (Linha TSS) com o TSS ocorre via APIs REST (2.0) e estão armazenadas no TFS.

```javascript
$/TSS/V12/Master/Fontes/NFSE/New Nfse/;
```

## :construction: Desenvolvimento

### :wrench: Pré Requisitos

1. Instalar [Node.js](https://nodejs.org/en/).
2. Instalar [Angular CLI](https://www.npmjs.com/package/@angular/cli).
3. Instalar [Git Bash](https://git-scm.com/downloads)
4. Possuir ambiente do TSS atualizada com pacote de Expedição contíua.  [Expedição Contínua do TSS](https://arte.engpro.totvs.com.br/engenharia/expedicao_continua/pacotes/latest/12.1.2210/tss/).
5. Instalar as dependências do projeto a partir do arquivo **package.json**, execute o comando:

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

## Execução de Testes end-to-end

Para executar os testes end-to-end via [Jasmine](https://jasmine.github.io/), será necessário realizar o download dos pacotes de dependências do Jasmine\Karma :

1. **Instalar o Jasmine**:

 ```javascript
  npm install jasmine --save-dev
```

2. **Instalar o Karma**:

```javascript
  npm install karma karma-coverage --save-dev
```


#### Execução com browse externo apresentado os resultados

```javascript
ng test --browsers=Chrome --code-coverage
```

#### Execução no console

```javascript
ng test --browsers=ChromeHeadless --code-coverage 
```


## :memo: Documentação

* 🔗 [Portal New NFS-e (Linha TSS): Guia de Referencia](https://tdn.totvs.com/pages/viewpage.action?pageId=775483319)
* 🔗 [Configuração e Implantação da New NFS-e Back-End](https://tdn.totvs.com/pages/viewpage.action?pageId=695194217)
* 🔗 [REST ADVPL](https://tdn.totvs.com/display/public/framework/REST+ADVPL)
* 🔗 [Entendendo as novidades do REST 2.0](https://tdn.totvs.com/display/public/framework/Entendendo+as+novidades+do+REST)
* 🔗 [Application Server - Porta Multiprotocolo](https://tdn.totvs.com/display/tec/Application+Server+-+Porta+Multiprotocolo)
* 🔗 [Perguntas mais frequentes do Portal New NFS-e](https://tdn.totvs.com/x/Ro2zJg)
* 🔗 [Registro de Alterações - Changelog](https://code.engpro.totvs.com.br/totvs-tss/Portal-New-NFS-e/src/branch/main/CHANGELOG.md)
