import { NgModule, } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', canActivate:[AuthGuard], loadChildren:() => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'configurar', canActivate:[AuthGuard], loadChildren:() => import("./pages/configurar/configurar.module").then(m => m.ConfigurarModule) },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
