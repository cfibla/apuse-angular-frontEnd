import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CarregaImatgeService {

  constructor() { }

  async actualitzaImatge(arxiu: File, tipus: 'usuaris' | 'alumnes', id: string) {
    try {

      const formData = new FormData();
      formData.append('imatge', arxiu);

      // console.log('formData', formData.append);

      const url = `${ base_url }/uploads/${ tipus }/${ id }`;

      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token')
        },
        body: formData
      });

      const data = await res.json();
      // console.log('DATA: ', data);
      // console.log('service actualtza IMG');
      if (data.ok) {
        return data.dataImatge.public_id;
      } else {
        console.log('ERROR: ', data.msg);
        return false;
      }

    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
