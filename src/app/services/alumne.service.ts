import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { AlumneDadesForm } from '../interfaces/alumne-dades.interface';
import { Usuari } from '../models/usuari.model';
import { Alumne } from '../models/alumne.model';
import { map } from 'rxjs/operators';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AlumneService {

  // private _amagarModal = true;
  public usuari: Usuari;
  public alumne: Alumne;

  public nouAlumne: EventEmitter<object> = new EventEmitter<object>();

  constructor(private http: HttpClient,
              // private router: Router
              ) { }


  // get amagarModal() {
  //   return this._amagarModal;
  // }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.alumne.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  obrirModal() {
    // this._amagarModal = false;
    console.log('obrir modal');
  }

  obrirDadesModal(id) {
    // this._amagarModal = false;
    console.log('obrir Dades modal');
    return this.http.get(`${base_url}/alumnes/${id}`, this.headers);
  }

  tancarModal() {
    // this._amagarModal = true;
    console.log('tancar modal');
  }

  crearAlumne(formData: AlumneDadesForm) {
    // console.log('SERVICE: ', formData);
    return this.http.post(`${base_url}/alumnes`, formData, this.headers);
  }

  getAlumnes( desde: number = 0 ) {
    const url = `${base_url}/alumnes?desde=${desde}`;
    // const alumneId = this.alumne.uid;
    return this.http.get<{total: number, alumnes: Alumne[]}>(url, this.headers)
              .pipe(
                // (res: {total: number, alumnes: Alumne[]}) => res
                map( 
                  res => {
                  const alumnes = res.alumnes
                  .map(alumne => new Alumne(
                    alumne.nom,
                    alumne.cognom1,
                    alumne.nivell,
                    alumne.classe,
                    alumne.centre,
                    alumne.tutor,
                    alumne.cognom2,
                    alumne.adresa,
                    alumne.img,
                    alumne.repetidor,
                    alumne.cursRepetit,
                    alumne.dataNaixement,
                    alumne.seguretatSoc,
                    alumne.email,
                    alumne.password,
                    alumne.telefon1,
                    alumne.telefon2,
                    alumne.estat,
                    alumne.atencioDiversitat,
                    alumne.atencioDiversitatSeguiment,
                    alumne.aill,
                    alumne.beca,
                    alumne.serveisSocials,
                    alumne.piCurricular,
                    alumne.piMetodologic,
                    alumne.piConductual,
                    alumne.piCatala,
                    alumne.piMates,
                    alumne.piCastellano,
                    alumne.piMedi,
                    alumne.piEducacioFisica,
                    alumne.piEducacioArtistica,
                    alumne.materialDiferenciat,
                    alumne.adequacioContingutsMates,
                    alumne.adequacioContingutsCatala,
                    alumne.adequacioContingutsCastella,
                    alumne.adequacioContingutsMedi,
                    alumne.fullDerivacio,
                    alumne.fullDerivacioAutor,
                    alumne.fullDerivacioMotiu,
                    alumne.certificatDisminucio,
                    alumne.percetatgeDisminucio,
                    alumne.valoracioEap,
                    alumne.valoracioEapAny,
                    alumne.dictamen,
                    alumne.motiuDictamen,
                    alumne.seguimentEap,
                    alumne.seguimentTsEap,
                    alumne.seguimentCredag,
                    alumne.seguimentCredv,
                    alumne.seguimentCsmij,
                    alumne.seguimentSeetdic,
                    alumne.seguimentCdiap,
                    alumne.seguimentPediatria,
                    alumne.seguimentNeuropediatria,
                    alumne.seguimentAltresEspecialitats,
                    alumne.AtencióServeisPrivats,
                    alumne.segActuacions,
                    alumne.segInformacioCAD,
                    alumne.segAltresCoord,
                    alumne.reunionsPares,
                    alumne.assist,
                    alumne.menjador,
                    alumne.uid
                    )
                  );
                  console.log('ALUMNES SERVICE: ', alumnes);
                  return {
                    total: res.total,
                    alumnes
                  };
                // }
              // )
                  })
                );
  }

  esborraAlumne(uid) {
    console.log('service:',uid);
    return this.http.delete(`${base_url}/alumnes/${uid}`, this.headers);
  }


}

