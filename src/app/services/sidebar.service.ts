import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Main', url: '/'},
        {titulo: 'Gráficas', url: 'grafica1'},
        {titulo: 'Progress Bar', url: 'progress'},
        {titulo: 'Promesas', url: 'promesas'},
        {titulo: 'RxJs', url: 'rxjs'}
      ]
    },
    {
      titulo: 'Super',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Centres', url: 'super/centres'},
        {titulo: 'Mestres', url: 'super/mestres'},
        {titulo: 'Alumnes', url: 'super/alumnes'}
      ]
    },
    {
      titulo: 'Administrador',
      icono: 'mdi mdi-folder-lock',
      submenu: [
        {titulo: 'Mestres', url: 'admin/mestres'},
        {titulo: 'Alumnes', url: 'admin/alumnes'}
      ]
    }
  ];

  constructor() { }
}
