import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [ HomeComponent
   ],
  imports: [
    BrowserModule,
    PoModule,
    RouterModule,
    PoTemplatesModule,
    HomeRoutingModule
  ],
  exports: [HomeComponent
  ],
  providers: [],
  bootstrap: []
})
export class HomeModule { }
