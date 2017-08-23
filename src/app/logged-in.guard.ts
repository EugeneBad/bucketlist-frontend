import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class LoggedInGuard implements CanActivate {
  status: boolean;
  constructor(private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {

    if (this.status == true || sessionStorage['token']) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;


  }
}
