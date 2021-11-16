import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AlumneService } from '../../services/alumne.service';
import { Usuari } from '../../models/usuari.model';

import Swal from 'sweetalert2';
import { UsuariService } from 'src/app/services/usuari.service';
import { CarregaImatgeService } from '../../services/carrega-imatge.service';
import { environment } from '../../../environments/environment';
import { Alumne } from '../../models/alumne.model';

const cloud_url = environment.cloud_url;

@Component({
  selector: 'app-modal-dades-alumne',
  templateUrl: './modal-dades-alumne.component.html',
  styles: []
})
export class ModalDadesAlumneComponent implements OnInit {

  @Input() alumneFill;

  dadesAlumne: FormGroup;

  public usuari: Usuari;
  public nouAlumne: Alumne[] = [];
  
  public validacio = false;
  public dataNa;
  private classe;
  private nivell;
  private repetidor = false;
  
  public imatge;
  public imatgePerPujar: File;
  public imgTemp = null;

  constructor(public alumneService: AlumneService,
              // private fb: FormBuilder,
              private usuariService: UsuariService,
              private carregaImatgeService: CarregaImatgeService,
              private modalService: NgbModal,
              ) {
                this.usuari = this.usuariService.usuari;
                this.classe = this.usuari.classe;
                this.nivell = this.usuari.nivell;
               }

  ngOnInit(): void {
    this.dadesAlumne = new FormGroup({
      nom: new FormControl(this.alumneFill.nom), //, Validators.minLength(2)
      cognom1: new FormControl(this.alumneFill.cognom1),
      cognom2: new FormControl(this.alumneFill.cognom2),
      dataNaixement: new FormControl(this.alumneFill.dataNaixement),
      seguretatSoc: new FormControl(this.alumneFill.seguretatSoc),
      adresa: new FormControl(this.alumneFill.adresa),
      telefon1: new FormControl(this.alumneFill.telefon1),
      telefon2: new FormControl(this.alumneFill.telefon2),
      email: new FormControl(this.alumneFill.email),
      nivell: new FormControl(this.alumneFill.nivell),
      classe: new FormControl(this.alumneFill.classe),
      repetidor: new FormControl(this.alumneFill.repetidor),
      cursRepetit: new FormControl(this.alumneFill.cursRepetit),
      atencioDiversitat: new FormControl(this.alumneFill.atencioDiversitat),
      serveisExternsSeguiment: new FormControl(this.alumneFill.serveisExternsSeguiment),
      fullDerivacio: new FormControl(this.alumneFill.fullDerivacio),
      fullDerivacioAutor: new FormControl(this.alumneFill.fullDerivacioAutor),
      fullDerivacioMotiu: new FormControl(this.alumneFill.fullDerivacioMotiu),
      beca: new FormControl(this.alumneFill.beca),
      valoracioEap: new FormControl(this.alumneFill.valoracioEap),
      valoracioEapAny: new FormControl(this.alumneFill.valoracioEapAny),
      dictamen: new FormControl(this.alumneFill.dictamen),
      motiuDictamen: new FormControl(this.alumneFill.motiuDictamen),
      adequacioContingutsMates: new FormControl(this.alumneFill.adequacioContingutsMates),
      adequacioContingutsCatala: new FormControl(this.alumneFill.adequacioContingutsCatala),
      adequacioContingutsCastella: new FormControl(this.alumneFill.adequacioContingutsCastella),
      adequacioContingutsMedi: new FormControl(this.alumneFill.adequacioContingutsMedi),
      piCatala: new FormControl(this.alumneFill.piCatala),
      piMates: new FormControl(this.alumneFill.piMates),
      piCastellano: new FormControl(this.alumneFill.piCastellano),
      piMedi: new FormControl(this.alumneFill.piMedi),
      piEducacioFisica: new FormControl(this.alumneFill.piEducacioFisica),
      piEducacioArtistica: new FormControl(this.alumneFill.piEducacioArtistica),
      seguimentEap: new FormControl(this.alumneFill.seguimentEap),
      seguimentTsEap: new FormControl(this.alumneFill.seguimentTsEap),
      seguimentCredag: new FormControl(this.alumneFill.seguimentCredag),
      seguimentCredv: new FormControl(this.alumneFill.seguimentCredv),
      seguimentCsmij: new FormControl(this.alumneFill.seguimentCsmij),
      seguimentSeetdic: new FormControl(this.alumneFill.seguimentSeetdic),
      seguimentCdiap: new FormControl(this.alumneFill.seguimentCdiap),
      seguimentPediatria: new FormControl(this.alumneFill.seguimentPediatria),
      seguimentNeuropediatria: new FormControl(this.alumneFill.seguimentNeuropediatria),
      seguimentAltresEspecialitats: new FormControl(this.alumneFill.seguimentAltresEspecialitats),
      atencioServeisPrivats: new FormControl(this.alumneFill.atencioServeisPrivats),

    });
    this.dadesAlumne.get('cursRepetit').disable();
  }

  get imatgeURL() {
    if (!this.alumneFill.img) {
        return `${cloud_url}v1617550969/no-imatge_nwdrzz.jpg`;
    } else {
        return `${cloud_url}v1617550969/${this.alumneFill.img}`;
    }
  }
  get validacioNom () {
    return this.dadesAlumne.get('nom').invalid && this.dadesAlumne.get('nom').touched
  }
  get validacioCognom () {
    return this.dadesAlumne.get('cognom1').invalid && this.dadesAlumne.get('cognom1').touched
  }
  get validacioEmail () {
    return this.dadesAlumne.get('email').invalid
  }
  get uid(): string {
    return this.alumneFill.uid || '';
  }
  get divDiversitat() {
    let divDiv = this.dadesAlumne.value.atencioDiversitat;
    return divDiv
  }
  get divServeisExterns() {
    return this.dadesAlumne.get('serveisExternsSeguiment').value
  }
  get divFullDerivacio() {
    let divDiv = this.dadesAlumne.value.fullDerivacio;
    return divDiv
  }
  get divValoracioEAP() {
    return this.dadesAlumne.get('valoracioEap').value
  }
  get divDictamen() {
    return this.dadesAlumne.get('dictamen').value
  }

  obrirModalDades(content) {
    // Corregir scrollable
    this.modalService.open(content, {scrollable: true, ariaLabelledBy: 'modal-dades-alumne', size: 'lg'}).result.then((res) => {
      // Al tancar amb DESA...
      this.pujarAlumne();
    }, (res) => {
      // Al tancar sense DESA...
    }
    );
  }

  async pujarAlumne() {
    if (this.dadesAlumne.invalid) {
      return;
    }
    this.dadesAlumne.value.uid = this.uid;
    const dades = this.dadesAlumne.value;
    console.log('DADES alumne uid:', dades.uid);
    await this.carregaImatgeService
          .actualitzaImatge(this.imatgePerPujar, 'alumnes', dades.uid)
          .then(img => {
            this.imatge = img;
            console.log('IMATGE PUJADA:',img);
            console.log('UID:',dades.uid);
            // this.actualitzaAlumne();
          }).catch(err => {
            Swal.fire('Error', "No s'ha pogut actualitzar la imatge", 'success');
          });
    // await this.pujarImatge(dades);
    await this.actualitzaAlumne();
    await this.alumneService.nouAlumne.emit(this.imatge);
  }

  actualitzaAlumne() {
    this.dadesAlumne.value.dataNaixement = this.dataNa;
    this.dadesAlumne.value.uid = this.uid;
    this.alumneService.actualitzarAlumne(this.dadesAlumne.value)
    .subscribe(res => { 
      console.log('RESPUESTA SERVICE dades:', res);
      // this.pujarImatge(res);
      // this.creaFormulari();
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
      console.log(err);
    });
  }

  datepicker(data) {
    console.log('DATEPICKER', data);
    this.dataNa = data;
    console.log('DATEPICKER 2', this.dadesAlumne);
  }

  canviRepetidor(data) {
    this.repetidor = data;
    if (data=='false') {
      this.dadesAlumne.get('cursRepetit').disable();
    }
    if (data=='true') {
      this.dadesAlumne.get('cursRepetit').enable();
    }
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

}
