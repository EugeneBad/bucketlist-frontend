import { Injectable } from '@angular/core';
import { GetBucketlistsService } from './get-bucketlists.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class LoggedInGuard implements CanActivate {
  status:boolean;
  constructor(private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {

    
    return false;


  }
}
