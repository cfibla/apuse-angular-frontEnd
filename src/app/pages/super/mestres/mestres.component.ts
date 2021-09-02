import { Component, OnInit } from '@angular/core';

import { Usuari } from 'src/app/models/usuari.model';
import { UsuariService } from '../../../services/usuari.service';
import { CerquesService } from '../../../services/cerques.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mestres',
  templateUrl: './mestres.component.html',
  styles: []
})
export class MestresSuperComponent implements OnInit {

  public totalMestres = 0;
  public mestres: Usuari[] = [];
  public mestresTemp: Usuari[] = [];
  public desde = 0;
  public carregant = true;

  constructor(  private usuariService: UsuariService,
                private cerquesService: CerquesService) { }

  ngOnInit(): void {
    this.carregarMestres();
  }

  carregarMestres() {
    this.carregant = true;
    this.usuariService.carregaUsuaris(this.desde)
    .subscribe( ({total, usuaris}) => {
      console.log(usuaris);
      this.totalMestres = total;
      this.mestres = usuaris;
      this.mestresTemp = usuaris;
      this.carregant = false;
    });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalMestres) {
      this.desde -= valor;
    }

    this.carregarMestres();
  }

  cercar(paraula: string) {
    if (paraula.length === 0) {
      return this.mestres = this.mestresTemp;
    }
    this.cerquesService.cercar('usuaris', paraula)
        .subscribe(res => {
          // Hola
          this.mestres = res as Usuari[];
        });
  }

  eliminarMestre(mestre: Usuari) {
    Swal.fire({
      title: 'Eliminar mestre',
      text: `${mestre.nom} ${mestre.cognom}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancel·lar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuariService.eliminarUsuari(mestre)
          .subscribe( res => {
            this.carregarMestres();

            Swal.fire(
              'Usuari eliminat',
              `${mestre.nom} ${mestre.cognom}`,
              'success'
            );

          }
        );
      }
    });
  }

  canviarRole(mestre: Usuari) {
    this.usuariService.actualitzarUsuari(mestre)
          .subscribe(res => {
            console.log(res);
          });
  }

}
