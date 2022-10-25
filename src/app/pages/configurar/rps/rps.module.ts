import { RpsComponent } from './rps.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PoFieldModule, PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { FormsModule } from '@angular/forms';
import { PoCodeEditorModule } from '@po-ui/ng-code-editor';



@NgModule({
  declarations: [ RpsComponent ],
  imports: [
    BrowserModule,
    PoModule,
    RouterModule,
    PoTemplatesModule,
    PoFieldModule,
    FormsModule,
    PoCodeEditorModule

  ],
  exports: [ RpsComponent ],
  providers: [],
  bootstrap: []
})
export class RpsConfigModule { }
