import { LoginComponent } from './login/login.component';
import { NgModule, } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './core/auth/auth.guard';
import { ConfigurarComponent } from './pages/configurar/configurar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', canActivate:[AuthGuard], loadChildren:() => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'configurar', canActivate:[AuthGuard], loadChildren:() => import("./pages/configurar/configurar.module").then(m => m.ConfigurarModule) },
  { path: '', redirectTo: 'login', pathMatch: 'full'}
  //{ path: 'home', component: HomeComponent, canActivate:[AuthGuard]}
  //{ path: 'configurar', component: ConfigurarComponent, canActivate:[AuthGuard] }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
