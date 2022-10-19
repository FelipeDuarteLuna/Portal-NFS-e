
import { HomeComponent } from './../home/home.component';
import { ConfigurarComponent } from './ConfigurarComponent';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RpsComponent } from './rps/rps.component';

const routes: Routes = [
  { path: '', component: ConfigurarComponent },
  { path: 'home', component: HomeComponent },
  { path: 'rps', component: RpsComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ConfigurarRoutingModule { }
