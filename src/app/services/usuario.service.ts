import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../environments/environment';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { RegisterForm } from '../interfaces/register-form.interfaces';
import { LoginForm } from '../interfaces/login-form.interfaces';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interfaces';

import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone ) {
                this.googleInit();
              }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role;
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  guardarLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
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
    localStorage.removeItem('menu');

    this.auth2.signOut().then(() => {
      // ngZone -> sino sería google la que
      // haría la navegación
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });

    });
  }

  validarToken(): Observable<boolean> {
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((res: any) => {

        const { email, google, nombre, role, img = '', uid } = res.usuario;
        this.usuario = new Usuario( nombre, email, '', img, google, role, uid );

        this.guardarLocalStorage(res.token, res.menu);

        return true;
      }),
      catchError(error => of(false))
    );
  }

  crearUsuario( formData: RegisterForm ) {

    // Primer argumento: URL
    // Segundo argumento: Data
    return this.http.post(`${base_url}/usuarios`, formData)
                    .pipe(
                      tap( (res: any) => {
                        this.guardarLocalStorage(res.token, res.menu);
                      })
                    );
  }


  actualizarPerfil(data: {email: string, nombre: string, role: string}) {
    data = {
      ...data,
      role: this.usuario.role
    };
    return this.http.put(`${base_url}/usuarios/${ this.uid }`, data, this.headers);
  }

  login( formData: LoginForm ) {

    // Primer argumento: URL
    // Segundo argumento: Data
    return this.http.post(`${base_url}/login`, formData)
                    .pipe(
                      tap( (res: any) => {
                        this.guardarLocalStorage(res.token, res.menu);
                      })
                    );
  }

  loginGoogle( token ) {

    // Primer argumento: URL
    // Segundo argumento: Data
    return this.http.post(`${base_url}/login/google`, {token})
                    .pipe(
                      tap( (res: any) => {
                        this.guardarLocalStorage(res.token, res.menu);
                      })
                    );
  }

  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers)
            .pipe(
              map(res => {

                const usuarios = res.usuarios.map(
                  user => new Usuario(
                    user.nombre,
                    user.email,
                    '',
                    user.img,
                    user.google,
                    user.role,
                    user.uid
                  ));
                return {
                  total: res.total,
                  usuarios
                };

              })
            );
  }

  eliminarUsuario(usuario: Usuario) {

    // /usuarios/5f42921d00fcc6057c631a2a
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);

    console.log('eliminando usuario');
  }

  guardarUsuario(usuario: Usuario) {
    return this.http.put(`${base_url}/usuarios/${ usuario.uid }`, usuario, this.headers);
  }
}
