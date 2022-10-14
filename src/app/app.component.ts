import { AuthService } from './login/auth.service';
import { Component } from '@angular/core';
import { AuthGuard } from './core/auth/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Portal-Nfse';

  mostraMenu: boolean = false;

  constructor( private authService: AuthService,
    private authGuard: AuthGuard ) {

  }

  ngOnInit(){
    this.authGuard.mostraMenuEmit.subscribe(
      mostra => this.mostraMenu = mostra
    );
  }
}
