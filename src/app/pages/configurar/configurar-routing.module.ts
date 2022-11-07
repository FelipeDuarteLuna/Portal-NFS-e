
import { HomeComponent } from './../home/home.component';
import { ConfigurarComponent } from './configurar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RpsComponent } from './rps/rps.component';
import { AuthGuard } from 'src/app/core/auth/auth.guard';
import { PageDefaultComponent } from './page-default/page-default.component';

const routes: Routes = [
  { path: '', component: ConfigurarComponent },
  //{ path: 'configurar', component: ConfigurarComponent },
  //{ path: 'home', component: HomeComponent },
  { path: 'rps', component: RpsComponent, canActivate:[AuthGuard] },
  //{ path: 'lote', component: PageDefaultComponent, canActivate:[AuthGuard]},
  //{ path: 'cancelamento', component: PageDefaultComponent, canActivate:[AuthGuard]},
  { path: ':id', component: PageDefaultComponent, canActivate:[AuthGuard]},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurarRoutingModule { }
