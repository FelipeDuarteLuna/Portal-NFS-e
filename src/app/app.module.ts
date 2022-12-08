import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule, PoPageDynamicSearchModule } from '@po-ui/ng-templates';
import { LoginModule } from './login/login.module';
import { LoginComponent } from './login/login.component';
import { AuthService } from './login/auth.service';
import { AuthGuard } from './core/auth/auth.guard';
import { NgModule } from '@angular/core';
import { PoCodeEditorModule } from '@po-ui/ng-code-editor';
import { HttpClientModule } from '@angular/common/http';
import { PageDefaultModule } from './pages/configurar/page-default/page-default.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    PoModule,
    PoTemplatesModule,
    LoginModule,
    PoPageDynamicSearchModule,
    PoCodeEditorModule,
    HttpClientModule,
    PageDefaultModule

  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
