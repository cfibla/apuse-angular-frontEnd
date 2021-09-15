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
  selector: 'app-modal-dades-alumne',
  templateUrl: './modal-dades-alumne.component.html',
  styles: []
})
export class ModalDadesAlumneComponent implements OnInit {

  dadesAlumne: FormGroup;
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
              private modalService: NgbModal,
              ) {
                this.usuari = this.usuariService.usuari;
                this.classe = this.usuari.classe;
                this.nivell = this.usuari.nivell;
                this.creaFormulari();
                this.dadesAlumne.get('cursRepetit').disable();
               }

  ngOnInit(): void {
   
  }

  get imatgeURL() {
    if (!this.dadesAlumne.value.img) {
        return `${cloud_url}v1617550969/no-imatge_nwdrzz.jpg`;
    } else {
        return this.dadesAlumne.value.img;
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

  obrirModalDades(content) {
    console.log('Hola');
    this.modalService.open(content, {ariaLabelledBy: 'modal-dades-alumne'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
      console.log(this.closeModal);
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      console.log(this.closeModal);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  creaFormulari() {
    this.dadesAlumne = this.fb.group({
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

  creaAlumne() {
    if (this.dadesAlumne.invalid) {
      return;
    } else {
      this.imgTemp = null;
      this.dadesAlumne.value.dataNaixement = this.dataNa;
      this.dadesAlumne.value.img = this.imatge;
      this.alumneService.crearAlumne(this.dadesAlumne.value)
      .subscribe(res => { 
            // console.log('RESPUESTA SERVICE', res);
            this.pujarImatge(res);
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

  pujarImatge(dades) {
    this.carregaImatgeService
        .actualitzaImatge(this.imatgePerPujar, 'alumnes', dades.alumne._id)
        .then(img => {
          console.log(img);
          this.imatge = img;
          this.alumneService.nouAlumne.emit(this.imatge);
        }).catch(err => {
          Swal.fire('Error', "No s'ha pogut actualitzar la imatge", 'success');
        });
  }

  tancarModal() {
    this.alumneService.tancarModal();
  }


}
