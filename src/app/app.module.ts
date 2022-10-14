import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { LoginModule } from './login/login.module';
import { LoginComponent } from './login/login.component';
import { HomeModule } from './pages/home/home.module';
import { MenuModule } from './core/auth/menu/menu.module';
import { AuthService } from './login/auth.service';
import { AuthGuard } from './core/auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    PoTemplatesModule,
    LoginModule,
    HomeModule,
    MenuModule,

  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
