import { ConfigurarComponent } from './ConfigurarComponent';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { ConfigurarRoutingModule } from './configurar-routing.module';


@NgModule({
  declarations: [ ConfigurarComponent
   ],
  imports: [
    BrowserModule,
    PoModule,
    RouterModule,
    PoTemplatesModule,
    ConfigurarRoutingModule
  ],
  exports: [ConfigurarComponent
  ],
  providers: [],
  bootstrap: []
})

export class ConfigurarModule {}
