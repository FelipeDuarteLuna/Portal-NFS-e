import { RpsComponent } from './rps/rps.component';
import { ConfigurarComponent } from './ConfigurarComponent';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ConfigurarComponent },
  { path: 'rps', component: RpsComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ConfigurarRoutingModule { }
