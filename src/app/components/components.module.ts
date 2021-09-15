import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DonutComponent } from './donut/donut.component';
import { ModalNouAlumneComponent } from './modal-nou-alumne/modal-nou-alumne.component';
import { ModalDadesAlumneComponent } from './modal-dades-alumne/modal-dades-alumne.component';
import { ModalEeAlumneComponent } from './modal-ee-alumne/modal-ee-alumne.component';
import { ModalTutoriesAlumneComponent } from './modal-tutories-alumne/modal-tutories-alumne.component';



@NgModule({
  declarations: [
    IncrementadorComponent,
    DonutComponent,
    ModalNouAlumneComponent,
    ModalDadesAlumneComponent,
    ModalEeAlumneComponent,
    ModalTutoriesAlumneComponent
  ],
  exports: [
    IncrementadorComponent,
    DonutComponent,
    ModalNouAlumneComponent,
    ModalDadesAlumneComponent,
    ModalEeAlumneComponent,
    ModalTutoriesAlumneComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  // bootstrap: [ModalNouAlumneComponent]
})
export class ComponentsModule { }
