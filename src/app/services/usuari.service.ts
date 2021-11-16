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

  get role(): 'SUPER_ROLE' | 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuari.role;
  }

  get uid(): string {
    return this.usuari.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  guardarLocalStorage(token: string, menu: any) {
    let menuJson = JSON.stringify(menu);
    localStorage.setItem('token', token);
    localStorage.setItem('menu', menuJson);
    console.log(menuJson);
  }

  validarToken(): Observable<boolean> {
    return this.http.get(`${base_url}/login/nou-token`, this.headers)
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
                          localStorage.setItem('menu', res.menu);
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
                        (res: any) => {
                          this.guardarLocalStorage(res.token, res.menu);
                        }
                      )
                    );
  }

  actualitzarPerfil(mestre: {nom: string, cognom: string, email: string, nivell: string, classe: string, role: string, centre}) {
  // Extreure el ROLE pq l'usuari no se'l pugui canviar
    mestre = {
      ...mestre,
      role: this.usuari.role
    };
    return this.http.put(`${base_url}/usuaris/${this.uid}`, mestre, this.headers);
  }

  actualitzarUsuari(mestre: Usuari) {
      return this.http.put(`${base_url}/usuaris/${mestre.uid}`, mestre, this.headers);
  }

  carregaUsuaris( desde: number = 0 ) {
    const url = `${base_url}/usuaris?desde=${desde}`;
    const usuariId = this.usuari.uid;
    return this.http.get<{total: number, usuaris: Usuari[]}>(url, this.headers)
              .pipe(
                map(res => {
                  const usuaris = res.usuaris.map(user => new Usuari(
                    user.email,
                    '',
                    user.nom,
                    user.cognom,
                    user.mestre,
                    user.nivell,
                    user.classe,
                    user.centre,
                    user.img,
                    user.role,
                    user.google,
                    user.estat,
                    user.lastLogin,
                    user.uid)
                  );
                  // Busco el meu usuari dins l'array
                  const removeIndex = usuaris.findIndex( item => item.uid === usuariId );
                  // Trec el meu usuari
                  usuaris.splice( removeIndex, 1 );
                  return {
                    total: res.total,
                    usuaris
                  };
                })
              );
  }

  eliminarUsuari(usuari: Usuari) {
    const url = `${base_url}/usuarisd/${usuari.uid}`;
    return this.http.delete(url, this.headers);
  }

  actualitzarCentre(centreUid) {
    return this.http.put(`${base_url}/canvi-centre/${this.uid}`, centreUid, this.headers);
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
                    .pipe(
                      tap(
                        (res: any) => {
                          this.guardarLocalStorage(res.token, res.menu);
                        }
                        )
                    );
  }

  // Amb el login de google
  // també cal modificar el logout

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
 
    this.router.navigateByUrl('/login');
  }

}
