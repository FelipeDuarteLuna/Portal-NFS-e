import { RpsComponent } from './rps.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { PoTemplatesModule } from '@po-ui/ng-templates';



@NgModule({
  declarations: [ RpsComponent ],
  imports: [
    BrowserModule,
    PoModule,
    RouterModule,
    PoTemplatesModule,

  ],
  exports: [ RpsComponent ],
  providers: [],
  bootstrap: []
})
export class RpsConfigModule { }
