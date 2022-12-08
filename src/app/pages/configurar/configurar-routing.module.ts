
import { ConfigurarComponent } from './configurar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth/auth.guard';
import { PageDefaultComponent } from './page-default/page-default.component';

const routes: Routes = [
  { path: '', component: ConfigurarComponent },
  { path: ':id', component: PageDefaultComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ConfigurarRoutingModule { }
