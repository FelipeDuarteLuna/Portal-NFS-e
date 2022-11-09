import { PageDefaultComponent } from './page-default.component';
import { NgModule } from '@angular/core';

import { PoFieldModule, PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { FormsModule } from '@angular/forms';
import { PoCodeEditorModule } from '@po-ui/ng-code-editor';




@NgModule({
  declarations: [ PageDefaultComponent ],
  imports: [
    PoModule,
    RouterModule,
    PoTemplatesModule,
    PoFieldModule,
    FormsModule,
    PoCodeEditorModule

  ],
  exports: [ PageDefaultComponent ],
  providers: [],
  bootstrap: []
})
export class PageDefaultModule { }
