import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AlumneService } from '../../services/alumne.service';
import { Usuari } from '../../models/usuari.model';

import Swal from 'sweetalert2';
import { UsuariService } from 'src/app/services/usuari.service';
import { CarregaImatgeService } from '../../services/carrega-imatge.service';
import { environment } from '../../../environments/environment';
import { Alumne } from '../../models/alumne.model';

const cloud_url = environment.cloud_url;

@Component({
  selector: 'app-modal-nou-alumne',
  templateUrl: './modal-nou-alumne.component.html',
  styles: []
})
export class ModalNouAlumneComponent implements OnInit {

  dadesAlumnes: FormGroup;
  closeModal: string;

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
              private fb: FormBuilder,
              private usuariService: UsuariService,
              private carregaImatgeService: CarregaImatgeService,
              private modalService: NgbModal
              ) {
                this.usuari = this.usuariService.usuari;
                this.classe = this.usuari.classe;
                this.nivell = this.usuari.nivell;
                this.creaFormulari();
                // this.noAdminNoSuper();
                this.dadesAlumnes.get('cursRepetit').disable();
               }

  ngOnInit(): void {
   
  }

  get imatgeURL() {
    if (!this.dadesAlumnes.value.img) {
        return `${cloud_url}v1617550969/no-imatge_nwdrzz.jpg`;
    } else {
        return this.dadesAlumnes.value.img;
    }
}
  get validacioNom () {
    return this.dadesAlumnes.get('nom').invalid && this.dadesAlumnes.get('nom').touched
  }
  get validacioCognom () {
    return this.dadesAlumnes.get('cognom1').invalid && this.dadesAlumnes.get('cognom1').touched
  }
  get validacioEmail () {
    return this.dadesAlumnes.get('email').invalid
  }
  // get noAdminNoSuper () {
  //   if(this.usuari.role==='USER_ROLE') {
  //     return true
  //   } else {
  //     return false
  //   }
  // }

  creaFormulari() {
    this.dadesAlumnes = this.fb.group({
      nom: new FormControl('', [Validators.required, Validators.minLength(2)]),
      cognom1: new FormControl('', [Validators.required, Validators.minLength(2)]),
      cognom2: new FormControl(''),
      dataNaixement: new FormControl('dd/mm/aaaa'),
      seguretatSoc: new FormControl(''),
      adresa: new FormControl(''),
      telefon1: new FormControl(''),
      telefon2: new FormControl(''),
      email: new FormControl('', Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')),
      nivell: new FormControl(this.nivell, Validators.required),
      classe: new FormControl(this.classe, Validators.required),
      repetidor: new FormControl(this.repetidor),
      cursRepetit: new FormControl(''),
      img: new FormControl('')
      // Para arrays
      // this.fb.array([]) - Clase 205 Angular Legacy
    });
  }

  noAdminNoSuper () {
    if(this.usuari.role==='USER_ROLE') {
      this.dadesAlumnes.get('nivell').disable();
      this.dadesAlumnes.get('classe').disable();
    } 
  }

  datepicker(data) {
    console.log('DATEPICKER', data);
    this.dadesAlumnes.value.dataNaixement = data;
    this.dataNa = data;
    console.log('DATEPICKER 2', this.dadesAlumnes);
  }

  canviRepetidor(data) {
    this.repetidor = data;
    if (data=='false') {
      this.dadesAlumnes.get('cursRepetit').disable();
    }
    if (data=='true') {
      this.dadesAlumnes.get('cursRepetit').enable();
    }
  }

  canviarImatge(file: File) {
    this.imatgePerPujar = file;
    console.log('ARXIU ESCOLLIT: ', file);
    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  async pujarAlumne() {
    if (this.dadesAlumnes.invalid) {
      return;
    } else {
      const dades = this.dadesAlumnes.value;
      await this.carregaImatgeService
            .actualitzaImatge(this.imatgePerPujar, 'alumnes', dades._id)
            .then(img => {
              // console.log('IMATGE PUJADA:',img);
              this.imatge = img;
              this.creaAlumne();
            }).catch(err => {
              Swal.fire('Error', "No s'ha pogut actualitzar la imatge", 'success');
            });
      await this.alumneService.nouAlumne.emit(this.imatge);
    }
  }

  async creaAlumne() {
    this.imgTemp = null;
    // this.dadesAlumnes.value.dataNaixement = this.dataNa;
    this.dadesAlumnes.value.img = this.imatge;
    console.log('DadesAlumne.value: ', this.dadesAlumnes.value);
    await this.alumneService.crearAlumne(this.dadesAlumnes.value)
    .subscribe(res => { 
      console.log('ALUMNE CREAT', res);
          this.creaFormulari();
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

  tancarModal() {
    this.alumneService.tancarModal();
  }

  obrirModalNouAlumne(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((res) => {
      this.pujarAlumne();
      // this.creaAlumne();
      // this.closeModal = `Closed with: ${res}`;
      // console.log(this.closeModal);
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      console.log(this.closeModal);
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdroooop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
