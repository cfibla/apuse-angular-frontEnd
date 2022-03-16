import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MestresComponent } from './administrador/mestres/mestres.component';
import { AlumnesComponent } from './administrador/alumnes/alumnes.component';
import { MestresSuperComponent } from './super/mestres/mestres.component';
import { AlumnesSuperComponent } from './super/alumnes/alumnes.component';
import { CentresSuperComponent } from './super/centres/centres.component';
import { LlistaAlumnesComponent } from './usuari/llista-alumnes/llista-alumnes.component';
import { LlistaAssistenciaComponent } from './usuari/llista-assistencia/llista-assistencia.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    MestresComponent,
    AlumnesComponent,
    MestresSuperComponent,
    AlumnesSuperComponent,
    CentresSuperComponent,
    LlistaAlumnesComponent,
    LlistaAssistenciaComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    PipesModule
  ]
})
export class PagesModule { }
