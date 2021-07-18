import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Centre } from 'src/app/models/centre.model';
import { CentreService } from '../../services/centre.service';
import { UsuariService } from '../../services/usuari.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nom: ['', [Validators.required, Validators.minLength(3)]],
    cognom: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(3)]],
    password2: ['', [Validators.required, Validators.minLength(3)]],
    condicions: [false, Validators.required],
    mestre: ['', Validators.required],
    nivell: ['', Validators.required],
    classe: ['', Validators.required],
    centre: ''
  }, {
    validators: this.passwordsIguals('password', 'password2')
  });
  public centreForm = this.fb.group({
    centre: ['', Validators.required],
  });

  public centres: any[] = [];
  public nomDeCentre = false;
  public centreTrobat = false;
  public centreUsuari: any = {};

  // https://analisi.transparenciacatalunya.cat/resource/e2ef-eiqj.json?codi_centre=17008237&any=2019

  constructor(
    private fb: FormBuilder,
    private centreService: CentreService,
    private usuariService: UsuariService,
    private router: Router
    ) { }


    cercaCentre(codi: string) {
      this.centreService.cercaGlobalCentres(codi)
      .subscribe(
        {
            next: (centres: any) => {
            this.centreTrobat = false;
            this.centres = centres;
            if (this.centres.length > 0) {
              this.centreTrobat = true;
            }
          }
        }
      );
    }
    cercaCentreDB(centre) {
      this.centreService.cercaParticularCentres(centre)
      .subscribe((centres: any) => {
        this.centres = centres;
        if (this.centres.length > 0) {
          this.centreTrobat = true;
        }
        console.log(this.centres);
      });
    }
    registreCentre() {
      const centre = this.centres[0];
      this.centreService.crearCentre(centre)
        .subscribe((centreRebut: any) => {
          this.centreUsuari = centreRebut.centre;
          if (this.centres.length > 0) {
            this.nomDeCentre = true;
          }
        });
    }
    crearUsuari() {
      this.formSubmitted = true;

      if (this.registerForm.invalid) {
        return;
      } else {
        this.registerForm.value.centre = this.centreUsuari.uid;
        this.usuariService.crearUsuari(this.registerForm.value)
            .subscribe(res => {

              this.router.navigateByUrl('/');

            }, (err) => {
              Swal.fire({
                title: 'Error',
                text: err.error.msg,
                icon: 'error',
                showClass: {
                  popup: 'animate__animated animate__fadeIn'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOut'
                }
              });
            });
      }
    }

    noValid(camp: string): boolean {
      if (this.registerForm.get(camp).invalid && this.formSubmitted) {
        return true;
      } else {
        return false;
      }
    }

    contrasenyaNoValida() {
      const pass1 = this.registerForm.get('password').value;
      const pass2 = this.registerForm.get('password2').value;

      if ((pass1 !== pass2) && this.formSubmitted) {
        return true;
      } else {
        return false;
      }
    }

    aceptaCondicions() {
      return !this.registerForm.get('condicions').value && this.formSubmitted;
    }

    passwordsIguals(pass1Name: string, pass2Name: string) {
      return (formGroup: FormGroup) => {

        const pass1Control = formGroup.get(pass1Name);
        const pass2Control = formGroup.get(pass2Name);

        if (pass1Control.value === pass2Control.value) {
          pass2Control.setErrors(null);
        } else {
          pass2Control.setErrors( { noEsIgual: true } );
        }
      };
    }

  }
