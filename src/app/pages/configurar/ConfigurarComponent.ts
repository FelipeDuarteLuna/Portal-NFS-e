import { ConfigurarService } from './configurar-component.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { PoPageDynamicSearchLiterals, PoPageDynamicSearchFilters } from '@po-ui/ng-templates';
import { PoPageAction, PoDialogService, PoNotificationService, PoTableColumn, PoSelectOption } from '@po-ui/ng-components';

@Component({
  selector: 'app-configurar',
  templateUrl: './configurar.component.html',
  styleUrls: ['./configurar.component.scss'],
  providers: [ConfigurarService]
})

export class ConfigurarComponent implements OnInit {
  hiringProcesses: Array<object>;
  hiringProcessesColumns: Array<PoTableColumn>;
  quickSearchWidth: number = 6;
  hideRemoveAllDisclaimer = false;
  hideCloseDisclaimers: Array<string> = ['city'];

//Tratamento bot„o home
  onClick_Home() {
     alert('Voltar Tela Home-Function onClick_Home() !!!!!');
     this.router.navigate(['/home']);
  }

  public readonly actions: Array<PoPageAction> = [

  ];

  readonly literals: PoPageDynamicSearchLiterals = {
    filterConfirmLabel: 'Aplicar',
    filterTitle: 'Filtro avan√ßado',
    quickSearchLabel: 'Valor pesquisado:'
  };

  private jobDescriptionOptions: Array<PoSelectOption> = [];
  private statusOptions: Array<PoSelectOption> = [];

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public readonly filters: Array<PoPageDynamicSearchFilters> = [
    { property: 'hireStatus', label: 'Hire Status', options: this.statusOptions, gridColumns: 6 },
    { property: 'name', gridColumns: 6 },
    { property: 'city', gridColumns: 6 },
    { property: 'job', label: 'Job Description', options: this.jobDescriptionOptions, gridColumns: 6 }
  ];

  constructor(
    private sampleHiringProcessesService: ConfigurarService,
    private poNotification: PoNotificationService,
    private poDialog: PoDialogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.hiringProcesses = this.sampleHiringProcessesService.getItems();
    this.hiringProcessesColumns = this.sampleHiringProcessesService.getColumns();
    this.statusOptions = this.sampleHiringProcessesService.getHireStatus();

    this.updateFilters();
  }

  onAdvancedSearch(filter) {
    filter ? this.searchItems(filter) : this.resetFilters();
  }

  onChangeDisclaimers(disclaimers) {
    const filter = {};
    disclaimers.forEach(item => {
      filter[item.property] = item.value;
    });
    this.searchItems(filter);
  }

  onQuickSearch(filter) {
    filter ? this.searchItems({ name: filter }) : this.resetFilters();
  }

  onLoadFields() {
    return this.sampleHiringProcessesService.getPageOptions();
  }

  private beforeRedirect(itemBreadcrumbLabel) {
    if (this.hiringProcesses.some(candidate => candidate['$selected'])) {
      this.poDialog.confirm({
        title: `Confirm redirect to ${itemBreadcrumbLabel}`,
        message: `There is data selected. Are you sure you want to quit?`,
        confirm: () => this.router.navigate(['/'])
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  private disableHireButton() {
    return !this.hiringProcesses.find(candidate => candidate['$selected']);
  }

  private hireCandidate() {
    const hired = 'Confirmado';
    const progress = 'Pendente';
    const canceled = 'Cancelado';

    const selectedCandidate = this.hiringProcesses.find(candidate => candidate['$selected']);
    switch (selectedCandidate['hireStatus']) {
      case progress:
        selectedCandidate['hireStatus'] = 'hired';
        this.poNotification.success('Confirmado!');
        break;

      case hired:
        this.poNotification.warning('Pendente.');
        break;

      case canceled:
        this.poNotification.error('Cancelado.');
        break;
    }
  }

  private resetFilters() {
    this.hiringProcesses = this.sampleHiringProcessesService.resetFilterHiringProcess();
  }

  private searchItems(filter) {
    this.hiringProcesses = this.sampleHiringProcessesService.filter(filter);
  }

  private updateFilters() {
    this.filters[0].options = this.statusOptions;
    this.filters[3].options = this.jobDescriptionOptions;
  }

  private onClickRemoveAllDisclaimer() {
    this.hideRemoveAllDisclaimer = !this.hideRemoveAllDisclaimer;
  }

  private isVisibleRemoveAllDisclaimer() {
    return !this.hideRemoveAllDisclaimer;
  }

  private isHideRemoveAllDisclaimer() {
    return this.hideRemoveAllDisclaimer;
  }

  private onClickCloseCityDisclaimer() {
    if (this.hideCloseDisclaimers.length > 0) {
      this.hideCloseDisclaimers = [];
    } else {
      this.hideCloseDisclaimers = ['city'];
    }
  }

  private isVisibleCloseCityDisclaimer() {
    return this.hideCloseDisclaimers.length <= 0;
  }

  private isHideCloseCityDisclaimer() {
    return this.hideCloseDisclaimers.length > 0;
  }

}
