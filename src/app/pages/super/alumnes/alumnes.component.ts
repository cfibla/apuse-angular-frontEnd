import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { AlumneService } from '../../../services/alumne.service';
import { Alumne } from '../../../models/alumne.model';
import { CerquesService } from '../../../services/cerques.service';

@Component({
  selector: 'app-alumnes',
  templateUrl: './alumnes.component.html',
  styleUrls: ['./alumnes.component.css']
})

export class AlumnesSuperComponent implements OnInit {

  public alumnes: Alumne[] = [];
  public alumnesTemp: Alumne[] = [];

  public carregant = true;
  public desde = 0;

  constructor(  private alumneService: AlumneService,
                private cerquesService: CerquesService
    ) { }

  ngOnInit(): void {
    this.carregarAlumnes();
    this.alumneService.nouAlumne
    .pipe(
      delay(100)
    )
    .subscribe(alumne => {
      
      this.carregarAlumnes();
    });
  }

  carregarAlumnes() {
    this.carregant = true;
    this.alumneService.getAlumnes(this.desde)
    .subscribe(res => {
      this.alumnes = res.alumnes;
      this.alumnesTemp = res.alumnes;
      this.carregant = false;
    });
  }

  esborrarAlumne(alumne: Alumne ) {
    Swal.fire({
      title: "Aquesta acció no es pot desfer",
      text: `Esborrar les dades de l'alumne ${alumne.nom} ${alumne.cognom1} ${alumne.cognom2}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Estic d'acord",
      cancelButtonText: "Cancel·lar",
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.alumneService.esborraAlumne(alumne.uid)
          .subscribe(res => {
            console.log(res);
            this.carregarAlumnes();
          });
      }
   })
  }

  obrirModal() {
    this.alumneService.obrirModal();
  }

  obrirDadesModal(id) {
    console.log(id);
    this.alumneService.obrirDadesModal(id)
    .subscribe(res => {
      console.log(res);
    });
  }

  cercar(paraula: string) {
    if (paraula.length === 0) {
      return this.alumnes = this.alumnesTemp;
    }
    this.cerquesService.cercar('alumnes', paraula)
        .subscribe(res => {
          this.alumnes = res as Alumne[];
        });
  }

}
