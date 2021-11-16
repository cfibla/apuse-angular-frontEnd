import { environment } from '../../environments/environment';

const cloud_url = environment.cloud_url;

interface _centre {
    client: boolean;
    codi: string;
    nom: string;
    email: string;
    municipi: string;
    telefon: string;
    adre_a: string;
    provincia: string;
    titularitat: string;
}

export class Usuari {
    constructor(
        public email: string,
        public password: string,
        public nom: string,
        public cognom: string,
        public mestre: string,
        public nivell: string,
        public classe: string,
        public centre: _centre,
        public img?: string,
        public role?: 'SUPER_ROLE' | 'ADMIN_ROLE' | 'USER_ROLE',
        public google?: boolean,
        public estat?: boolean,
        public lastLogin?: string,
        public uid?: string

    ) {}

    get imatgeURL() {
        if (!this.img) {
            return `${cloud_url}v1617550969/no-imatge_nwdrzz.jpg`;
        } else if (this.img.includes('https')) {
            return `${cloud_url}${this.img}`;
        } else if (this.img) {
            return `${cloud_url}${this.img}`;
        } else {
            return `${cloud_url}v1617550969/no-imatge_nwdrzz.jpg`;
        }
    }
}
