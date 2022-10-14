import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { MenuService } from './menu.service';
import { MenuComponent } from './menu.component';


@NgModule({
  declarations: [ MenuComponent
   ],
  imports: [
    BrowserModule,
    PoModule,
    RouterModule,
    PoTemplatesModule,
  ],
  exports: [MenuComponent
  ],
  providers: [MenuService],
  bootstrap: []
})

export class MenuModule { }
