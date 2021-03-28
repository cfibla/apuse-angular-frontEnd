import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';

import { Centre } from '../models/centre.model';

import { environment } from 'src/environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class CentreService {

  constructor(
    private http: HttpClient
  ) { }

  cercaGlobalCentres(codi: string) {
    const anyo = (new Date()).getFullYear() - 2;
    const url = `https://analisi.transparenciacatalunya.cat/resource/e2ef-eiqj.json?codi_centre=${ codi }&any=${ anyo }`;
    // console.log(url);
    return this.http.get(url);
      // .pipe(
      //   map( (resp: Centre[]) => resp)
      //   );

  }

  cercaParticularCentres(centre: any) {
    const url = `${base_url}/centres/`;

    return this.http.get(url);
      // .pipe(
      //   map( (resp: Centre[]) => resp)
      //   );

  }

  crearCentre(centre) {
    const url = `${base_url}/centres/`;

    const centreCreat = {

      codi: centre.codi_centre,
      nom: centre.denominaci_completa,
      email: centre.e_mail_centre,
      municipi: centre.nom_municipi,
      telefon: centre.tel_fon,
      adre_a: centre.adre_a,
      provincia: centre.nom_delegaci,
      codiPostal: centre.codi_postal,
      titularitat: centre.nom_naturalesa
      // client: {},
      // password: {}
    };

    return this.http.post(url, {...centreCreat});
  }
}
