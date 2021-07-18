import { Component } from '@angular/core';
import { UsuariService } from '../../services/usuari.service';
import { Usuari } from '../../models/usuari.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent {

  public usuari: Usuari;

  constructor( private usuariService: UsuariService) {
    this.usuari = usuariService.usuari;
  }

  logout() {
    this.usuariService.logout();
  }



}
