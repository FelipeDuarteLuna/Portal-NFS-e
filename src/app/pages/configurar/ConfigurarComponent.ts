import { Component, OnInit } from '@angular/core';
import { ConfigurarService } from './configurar-component.service';


@Component({
  selector: 'app-configurar',
  templateUrl: './configurar.component.html',
  styleUrls: ['./configurar.component.scss'],
  providers: [ConfigurarService],
})
export class ConfigurarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
