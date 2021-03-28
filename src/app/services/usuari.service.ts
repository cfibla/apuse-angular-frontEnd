import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariService {

  constructor(private http: HttpClient,
              private router: Router) { }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/nou-token`, {headers: {'x-token': token}})
                      .pipe(
                        tap((res: any) => {
                          localStorage.setItem('token', res.token);
                        }),
                        map(res => true),
                        // El "of" crea un Observable del que hi ha dins del parèntesi
                        catchError(error => of(false))
                      );
  }

  crearUsuari(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuaris`, formData)
                    .pipe(
                      tap(
                        (res: any) => { localStorage.setItem('token', res.token); }
                        )
                    );
  }
  
  // Amb el login de google
  // també cal modificar el logout

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
                    .pipe(
                      tap(
                        (res: any) => { localStorage.setItem('token', res.token); }
                        )
                    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

}
