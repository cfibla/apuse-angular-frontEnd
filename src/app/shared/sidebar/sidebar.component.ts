import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

import { Usuari } from 'src/app/models/usuari.model';
import { UsuariService } from '../../services/usuari.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent {

  public usuari: Usuari;

  public menuItems: any[];

  constructor(private sidebarService: SidebarService,
              private usuariService: UsuariService) {
    this.menuItems = sidebarService.menu;
    this.usuari = usuariService.usuari;
    console.log('SIDEBAR:',this.usuari);
  }

  logout() {
    this.usuariService.logout();
  }

}
