import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariService } from '../services/usuari.service';

@Injectable({
  providedIn: 'root'
})
export class SuperGuard implements CanActivate {

  constructor (private usuariService: UsuariService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this.usuariService.role === 'SUPER_ROLE') {
        return true
      } else {
        this.usuariService.logout();
        return false
      }
      
  }
  
}
