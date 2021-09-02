import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DonutComponent } from './donut/donut.component';
import { ModalNouAlumneComponent } from './modal-nou-alumne/modal-nou-alumne.component';



@NgModule({
  declarations: [
    IncrementadorComponent,
    DonutComponent,
    ModalNouAlumneComponent
  ],
  exports: [
    IncrementadorComponent,
    DonutComponent,
    ModalNouAlumneComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
