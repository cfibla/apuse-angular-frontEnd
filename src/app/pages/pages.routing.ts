import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// Administrador
import { MestresComponent } from './administrador/mestres/mestres.component';
import { AlumnesComponent } from './administrador/alumnes/alumnes.component';

// Super
import { MestresSuperComponent } from './super/mestres/mestres.component';
import { CentresSuperComponent } from './super/centres/centres.component';
import { AlumnesSuperComponent } from './super/alumnes/alumnes.component';
import { AdminGuard } from '../guards/admin.guard';
import { SuperGuard } from '../guards/super.guard';
import { LlistaAlumnesComponent } from './usuari/llista-alumnes/llista-alumnes.component';
import { LlistaAssistenciaComponent } from './usuari/llista-assistencia/llista-assistencia.component';

const routes: Routes = [

    { path: 'dashboard',
      component: PagesComponent,
      canActivate: [AuthGuard],
      children: [
        { path: '', component: DashboardComponent, data: {titulo: 'Menú'} },
        { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'} },
        { path: 'grafica1', component: Grafica1Component, data: {titulo: 'Gráficas'} },
        { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Account-settings'} },
        { path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJs'} },
        { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'} },
        { path: 'perfil', component: PerfilComponent, data: {titulo: "Perfil d'usuari"} },
        // Administrador
        { path: 'admin/mestres', canActivate: [AdminGuard], component: MestresComponent, data: {titulo: 'Admin - Administració mestres'} },
        { path: 'admin/alumnes', canActivate: [AdminGuard], component: AlumnesComponent, data: {titulo: 'Admin - Administració alumnes'} },
        // Super
        { path: 'super/mestres', canActivate: [SuperGuard], component: MestresSuperComponent, data: {titulo: 'Super - Administració mestres'} },
        { path: 'super/alumnes', canActivate: [SuperGuard], component: AlumnesSuperComponent, data: {titulo: 'Super - Administració alumnes'} },
        { path: 'super/centres', canActivate: [SuperGuard], component: CentresSuperComponent, data: {titulo: 'Super - Administració centres'} },
        // Usuari
        { path: 'user/alumnes', component: LlistaAlumnesComponent, data: {titulo: 'Dades alumnes'} },
        { path: 'user/assistencia', component: LlistaAssistenciaComponent, data: {titulo: 'Assistència'} },
      ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
