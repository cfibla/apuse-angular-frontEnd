import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../environments/environment';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { RegisterForm } from '../interfaces/register-form.interfaces';
import { LoginForm } from '../interfaces/login-form.interfaces';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone ) {
                this.googleInit();
              }

  googleInit() {

    return new Promise(resolve => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '933540285332-o34hcdro5vmtj54m62jif3kk2uum22et.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      // ngZone -> sino sería google la que
      // haría la navegación
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });

    });
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      }),
      map(res => true),
      catchError(error => of(false))
    );
  }

  crearUsuario( formData: RegisterForm ) {

    // Primer argumento: URL
    // Segundo argumento: Data
    return this.http.post(`${base_url}/usuarios`, formData)
                    .pipe(
                      tap( (res: any) => {
                        localStorage.setItem('token', res.token);
                      })
                    );
  }

  login( formData: LoginForm ) {

    // Primer argumento: URL
    // Segundo argumento: Data
    return this.http.post(`${base_url}/login`, formData)
                    .pipe(
                      tap( (res: any) => {
                        localStorage.setItem('token', res.token);
                      })
                    );
  }

  loginGoogle( token ) {

    // Primer argumento: URL
    // Segundo argumento: Data
    return this.http.post(`${base_url}/login/google`, {token})
                    .pipe(
                      tap( (res: any) => {
                        localStorage.setItem('token', res.token);
                      })
                    );
  }
}
