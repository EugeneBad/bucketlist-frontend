import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class LoggedInGuard implements CanActivate {
  canActivate(){
    return true;
  }
}