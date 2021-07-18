import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuari } from '../models/usuari.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariService {

  public usuari: Usuari;

  constructor(private http: HttpClient,
              private router: Router) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuari.uid || '';
  }

  validarToken(): Observable<boolean> {
    return this.http.get(`${base_url}/login/nou-token`, {headers: {'x-token': this.token}})
                      .pipe(
                        map((res: any) => {
                          const {
                            centre,
                            classe,
                            cognom,
                            email,
                            estat,
                            google,
                            mestre,
                            nivell,
                            nom,
                            role,
                            img = '',
                            lastLogin= '',
                            uid
                          } = res.usuari;
                          this.usuari = new Usuari(
                            email,
                            '',
                            nom,
                            cognom,
                            mestre,
                            nivell,
                            classe,
                            centre,
                            img,
                            role,
                            google,
                            estat,
                            lastLogin,
                            uid);

                          localStorage.setItem('token', res.token);
                          return true;
                        }),
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

  actualitzarPerfil(data: {nom: string, cognom: string, email: string, nivell: string, classe: string, role: string, centre}) {
    data = {
      ...data,
      role: this.usuari.role
    };
    return this.http.put(`${base_url}/usuaris/${this.uid}`, data, {headers: {'x-token': this.token}});
  }

  actualitzarCentre(centreUid) {
    // console.log('usuariSERVICE - Centre UID:', centreUid);
    // console.log(`${base_url}/canvi-centre/${this.uid}`);
    return this.http.put(`${base_url}/canvi-centre/${this.uid}`, centreUid, {headers: {'x-token': this.token}});
  }

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
