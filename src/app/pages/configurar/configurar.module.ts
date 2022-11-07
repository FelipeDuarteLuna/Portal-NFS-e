import { ConfigurarComponent } from './configurar.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PoFieldModule, PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { PoTemplatesModule, PoPageDynamicSearchModule } from '@po-ui/ng-templates';
import { ConfigurarRoutingModule } from './configurar-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ ConfigurarComponent
   ],
  imports: [
    //BrowserModule,
    PoModule,
    RouterModule,
    PoTemplatesModule,
    ConfigurarRoutingModule,
    PoPageDynamicSearchModule,
    PoFieldModule,
    FormsModule,
    ReactiveFormsModule

  ],
  exports: [ConfigurarComponent],
  providers: [],
  bootstrap: []
})

export class ConfigurarModule {

}
