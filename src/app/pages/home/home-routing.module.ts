import { HomeComponent } from './home.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurarComponent } from '../configurar/ConfigurarComponent';

const routes: Routes = [
  { path: 'configurar', component: ConfigurarComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
