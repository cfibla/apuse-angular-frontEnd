import { Component, OnInit } from '@angular/core';
import { CentreService } from '../../../services/centre.service';
import { CerquesService } from '../../../services/cerques.service';
import { Centre } from '../../../models/centre.model';

@Component({
  selector: 'app-centres',
  templateUrl: './centres.component.html',
  styleUrls: ['./centres.component.css']
})
export class CentresSuperComponent implements OnInit {

  public centres: Centre[] = [];
  public carregant = true;

  constructor(private centreService: CentreService,
              private cerquesService: CerquesService) { }

  ngOnInit(): void {
    this.carregaCentres();
  }

  carregaCentres() {
    this.carregant = true;
    this.centreService.getCentres()
          .subscribe(centres => {
            this.carregant = false;
            this.centres = centres;
          });
  }

  canviarClient(centre: Centre) {
    this.centreService.actualitzarCentre(centre)
          .subscribe(res => {
            console.log(res);
          });
  }

  cercar(paraula: string) {
    if (paraula.length === 0) {
      return this.carregaCentres();
    }
    this.cerquesService.cercarCentres(paraula)
        .subscribe(res => {
          this.centres = res;
        });
  }

}
