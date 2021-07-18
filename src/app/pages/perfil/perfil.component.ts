import { CompilerConfig } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuariService } from '../../services/usuari.service';
import { Usuari } from '../../models/usuari.model';
import { CarregaImatgeService } from '../../services/carrega-imatge.service';
import { CentreService } from '../../services/centre.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuari: Usuari;
  public imatgePerPujar: File;
  public imgTemp = null;

  public centres: any[] = [];
  public nomDeCentre = false;
  public centreTrobat = false;
  public centreUsuari: any = {};
  public centre;

  constructor(private fb: FormBuilder,
              private usuariService: UsuariService,
              private centreService: CentreService,
              private carregaImatgeService: CarregaImatgeService) {

      this.usuari = usuariService.usuari;
      this.centre = this.usuari.centre;
}

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nom: [this.usuari.nom, Validators.required],
      cognom: [this.usuari.cognom, Validators.required],
      email: [this.usuari.email, Validators.email],
      mestre: [this.usuari.mestre, Validators.required],
      nivell: [this.usuari.nivell, Validators.required],
      classe: [this.usuari.classe, Validators.required]
    });
  }

  actualitzarPerfil() {
    // console.log('Què arriba del formulari?: ', this.perfilForm.value);
    this.usuariService.actualitzarPerfil(this.perfilForm.value)
      .subscribe(res => {
        const {nom, email} = this.perfilForm.value;
        this.usuari.nom = nom;
        this.usuari.email = email;

        Swal.fire('Usuari actualitzat', "S'han desat tots els canvis", 'success');
      }, (err) => {
        Swal.fire("No s'ha pogut actualitzar l'usuari", err.error.msg, 'error');
      });
  }

  canviarImatge(file: File) {
    this.imatgePerPujar = file;
    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  pujarImatge() {
    this.carregaImatgeService
        .actualitzaImatge(this.imatgePerPujar, 'usuaris', this.usuari.uid)
        .then(img => {
          this.usuari.img = img;
          Swal.fire('Imatge actualitzada', "S'han desat tots els canvis", 'success');
        }).catch(err => {
          Swal.fire('Error', "No s'ha pogut actualitzar la imatge", 'success');
        });
  }
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

  actualitzaCentre(centre = this.centres[0]) {
    this.centreService.crearCentre(centre)
      .subscribe((centreRebut: any) => {

        this.usuariService.actualitzarCentre(centreRebut)
        .subscribe(res => {
          this.usuari.centre = centreRebut.centre;
          this.centres = [];
        });

      });
  }

}
