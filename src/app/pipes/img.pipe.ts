import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const cloud_url = environment.cloud_url;

@Pipe({
  name: 'img'
})
export class ImgPipe implements PipeTransform {

  transform(img: string, tipus: 'usuaris'|'centres'|'alumnes'): string {
    if (!img) {
      return `${cloud_url}v1617550969/no-imatge_nwdrzz.jpg`;
  } else if (img.includes('https')) {
      return `${cloud_url}${img}`;
  } else if (img) {
      return `${cloud_url}${img}`;
  } else {
      return `${cloud_url}v1617550969/no-imatge_nwdrzz.jpg`;
  }
  }
}
