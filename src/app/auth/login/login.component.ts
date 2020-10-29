import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

import Swal from 'sweetalert2';

declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public auth2: any;

  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    remember: [false]
  });


  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private ngZone: NgZone) { }
  ngOnInit(): void {
    this.renderButton();
  }


  login() {

    this.usuarioService.login(this.loginForm.value)
        .subscribe(res => {

          if (this.loginForm.get('remember').value) {
            localStorage.setItem('email', this.loginForm.get('email').value);
          } else {
            localStorage.removeItem('email');
          }

          // Redirect al Dashboard
          this.router.navigateByUrl('/');

        }, (err) => {
          // Si hay error en el POST -> ('TITULO', MENSAJE, ICONO)
          Swal.fire('Error', err.error.msg, 'error');
        });

  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark'
    });

    this.startApp();
  }

  startApp() {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '933540285332-o34hcdro5vmtj54m62jif3kk2uum22et.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  }

  attachSignin(element) {

    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          const id_token = googleUser.getAuthResponse().id_token;
          // console.log(id_token);
          this.usuarioService.loginGoogle(id_token)
            .subscribe(res => {
              // Redirect al Dashboard
              // Usamos el ngZone
              this.ngZone.run(() => {
                this.router.navigateByUrl('/');
              });
            });


        }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
