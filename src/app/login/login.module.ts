import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { PoTemplatesModule } from '@po-ui/ng-templates';

@NgModule({
  declarations: [
   ],
  imports: [
    // CommonModule,
    PoModule,
    PoTemplatesModule
  ],
  exports: [
  ],
  providers: [],
  bootstrap: []
})
export class LoginModule { }
