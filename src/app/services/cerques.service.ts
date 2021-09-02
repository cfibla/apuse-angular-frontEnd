import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuari } from '../models/usuari.model';
import { Alumne } from '../models/alumne.model';
import { Centre } from '../models/centre.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CerquesService {

  constructor( private http: HttpClient) { }


  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  private transformarUsuaris(mestres: any[]): Usuari[] {
    return mestres.map(
      user => new Usuari(
        user.email,
        '',
        user.nom,
        user.cognom,
        user.mestre,
        user.nivell,
        user.classe,
        user.centre,
        user.img,
        user.role,
        user.google,
        user.estat,
        user.lastLogin,
        user.uid
      )
    );
  }

  private transformarAlumnes(alumnes: any[]): Alumne[] {
    return alumnes.map(
      alumne => new Alumne(
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
  }

  private transformarCentres(centres: any[]): Centre[] {
    return centres;
  }

  cercar(tipus: 'alumnes' | 'usuaris' | 'centres', paraula = '') {
    const url = `${base_url}/todo/coleccio/${tipus}/${paraula}`;
    return this.http.get<any[]>(url, this.headers)
            .pipe(
              map ((res: any) => {
                switch (tipus) {
                  case 'usuaris':
                    return this.transformarUsuaris(res.resultats);
                  case 'centres':
                    return this.transformarCentres(res.resultats);
                  case 'alumnes':
                    return this.transformarAlumnes(res.resultats);
                  default:
                    return[];
                }
              })
            );
  }
  cercarCentres(paraula = '') {
    const url = `${base_url}/todo/coleccio/centres/${paraula}`;
    return this.http.get<any[]>(url, this.headers)
            .pipe(
              map ((res: any) => {
                  return this.transformarCentres(res.resultats);
                }
              )
            );
  }
  cercarUsuaris(paraula = '') {
    const url = `${base_url}/todo/coleccio/usuaris/${paraula}`;
    return this.http.get<any[]>(url, this.headers)
            .pipe(
              map ((res: any) => {
                    return this.transformarUsuaris(res.resultats);
                }
              )
            );
  }
}
