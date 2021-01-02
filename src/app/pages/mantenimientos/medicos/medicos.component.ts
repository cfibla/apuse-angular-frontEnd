import { Component, OnDestroy, OnInit } from '@angular/core';
import { Medico } from '../../../models/medico.model';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];
  public cargando = true;
  private imgSubs: Subscription;

  constructor(  private medicoService: MedicoService,
                private modalImagenService: ModalImagenService,
                private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.nuevaImagen
                      .pipe(delay(100))
                      .subscribe(img => this.cargarMedicos());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos()
      .subscribe(medicos => {
        this.cargando = false;
        this.medicos = medicos;
        console.log(medicos);
      })

  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarMedicos();
    }

    this.busquedasService.buscar('medicos', termino)
      .subscribe((resultados: Medico[]) => {
        this.medicos = resultados;
      });
  }

  borrarMedico(medico: Medico) {

    Swal.fire({
      title: `¿Estás seguro de borrar al médico ${medico.nombre}?`,
      text: 'Esta operación no se puede deshacer',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.medicoService.borrarMedicos(medico._id)
            .subscribe(res => {
              this.cargarMedicos();
              Swal.fire(
              'Médico borrado',
              `Se ha borrardo el médico ${medico.nombre}`,
              'success'
              );
            });
      }
    });

  }

}
