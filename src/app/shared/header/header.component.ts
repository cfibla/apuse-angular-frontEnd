import { Component } from '@angular/core';
import { UsuariService } from '../../services/usuari.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent {

  constructor( private usuariService: UsuariService) { }

  logout () {
    this.usuariService.logout();
  }



}
