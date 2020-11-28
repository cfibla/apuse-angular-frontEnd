import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  // Para subir archivos o imágenes
  // se puede hacer de varias maneras
  // Aquí lo haremos con Fetch (puro JS)

  async actualizarImagen(
    archivo: File,
    tipo: 'usuarios'|'medicos'|'hospitales',
    id: string
  ) {

    try {

      const url = `${base_url}/uploads/${tipo}/${id}`;
      const formData = new FormData();

      formData.append('imagen', archivo);

      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await res.json();

      if (data.ok) {
        return data.nombreArchivo;
      } else {
        console.log(data.msg);
        return false;
      }

      return 'Nombre de la imagen';

    } catch (error) {

      console.log(error);
      return false;

    }
  }
}
