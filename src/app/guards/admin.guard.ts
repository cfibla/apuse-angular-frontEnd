import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariService } from '../services/usuari.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private usuariService: UsuariService,
              private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      if (this.usuariService.role === 'ADMIN_ROLE') {
        return true
      } else {
        this.usuariService.logout();
        return false
      }

      // return (this.usuariService.role === 'ADMIN_ROLE') ? true : false;

  }
  
}
