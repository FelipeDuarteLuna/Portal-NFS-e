import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  mostraMenuEmit = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    public instservice: AppService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.instservice.isLogged()){
        this.mostraMenuEmit.emit(false);
        this.router.navigate(['']);
        return false;
    } else {
        this.mostraMenuEmit.emit(true);
        console.log('Passou no cancativate do guardião');
        return true;
    }
  }

}
