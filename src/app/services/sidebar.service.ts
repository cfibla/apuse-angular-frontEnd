import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [];

  carregaMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu'));

    // if (this.menu.length === 0) {

    // }
  };
  // menu = [
  //   {
  //     titulo: 'Dashboard',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       {titulo: 'Main', url: '/'},
  //       {titulo: 'Gráficas', url: 'grafica1'},
  //       {titulo: 'Progress Bar', url: 'progress'},
  //       {titulo: 'Promesas', url: 'promesas'},
  //       {titulo: 'RxJs', url: 'rxjs'}
  //     ]
  //   },
  //   {
  //     titulo: 'Administrador',
  //     icono: 'mdi mdi-folder-lock',
  //     submenu: [
  //       {titulo: 'Mestres', url: 'admin/mestres'},
  //       {titulo: 'Alumnes', url: 'admin/alumnes'}
  //     ]
  //   },
  //   {
  //     titulo: 'Llistats',
  //     icono: 'mdi mdi-folder-lock',
  //     submenu: [
  //       {titulo: 'Dades alumnes', url: 'user/alumnes'},
  //       {titulo: 'Assistència', url: 'user/assistencia'}
  //     ]
  //   },
  //   {
  //     titulo: 'Super',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       {titulo: 'Centres', url: 'super/centres'},
  //       {titulo: 'Mestres', url: 'super/mestres'},
  //       {titulo: 'Alumnes', url: 'super/alumnes'}
  //     ]
  //   }
  // ];

  // get role(): 'SUPER_ROLE' | 'ADMIN_ROLE' | 'USER_ROLE' {
  //   console.log('ROLE:',this.usuari.role);
  //   return this.usuari.role;
  // }

  // constructor(  private usuariService: UsuariService) {
  //   console.log('USUARI:',this.usuariService.usuari);
    
  // }
}
