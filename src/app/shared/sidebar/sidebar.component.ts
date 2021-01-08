import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  // public menuItems: any[];
  public usuario: Usuario;

  constructor(public sidebarService: SidebarService,
              private usuarioService: UsuarioService
              ) {
    // this.menuItems = sidebarService.menu;
    this.usuario = usuarioService.usuario;
    // Como imagenUrl es un 'get', no hacen falta los ()
  }

  ngOnInit(): void {
  }

}
