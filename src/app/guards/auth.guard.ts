import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { UsuariService } from '../services/usuari.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuariService: UsuariService,
              private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this.usuariService.validarToken()
                  .pipe(
                    tap(isLogged => {

                      if (!isLogged) {
                        this.router.navigateByUrl('/login');
                      }

                    })
                  );
  }
}
