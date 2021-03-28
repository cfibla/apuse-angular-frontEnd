import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuariService } from '../../services/usuari.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formSubmitted = false;
  public errorLogin = '';

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', Validators.required],
    password: ['', Validators.required],
    remember: [false]
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private usuariService: UsuariService) { }

  login() {
    this.usuariService.login(this.loginForm.value)
      .subscribe({
        next: res => {
          if (this.loginForm.get('remember').value) {
            localStorage.setItem('email', this.loginForm.get('email').value);
          } else {
            localStorage.removeItem('email');
          }

          this.router.navigateByUrl('/');
        },
        error: err => this.errorLogin = err.error.msg
    });
  }

}
