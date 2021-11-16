import { Component } from '@angular/core';

import { Usuari } from 'src/app/models/usuari.model';
import { UsuariService } from '../../services/usuari.service';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent {

  public usuari: Usuari;
  public menu=[];

  constructor(
    public sidebarService: SidebarService,
    private usuariService: UsuariService
              ) {
                this.usuari = usuariService.usuari;
                this.menu = sidebarService.menu;
  }

  logout() {
    this.usuariService.logout();
  }

}
