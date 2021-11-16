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

interface _usuari {
    email: string;
    password: string;
    nom: string;
    cognom: string;
    mestre: string;
    nivell: string;
    classe: string;
    centre: _centre;
    img?: string;
    role?: string;
    google?: boolean;
    estat?: boolean;
    lastLogin?: string;
    uid?: string;
}

export class Alumne {
    constructor(
        public nom: string,
        public cognom1: string,
        public nivell: string,
        public classe: string,
        // PROPIETARIS
            public centre: _centre,
            public tutor: _usuari,
        // esp: {
        //     type: Schema.ObjectId,
        //     ref: 'UserEsp'
        // },
        // ee: {
        //     type: Schema.ObjectId,
        //     ref: 'UserEe'
        // },
        public cognom2?: string,
        public adresa?: string,
        public img?: string,
        public repetidor?: boolean,
        public cursRepetit?: string,
        public dataNaixement?: string,
        public seguretatSoc?: string,
        public email?: string,
        public password?: string,
        public telefon1?: string,
        public telefon2?: string,
        public estat?: boolean,
        public atencioDiversitat?: boolean, //
        public atencioDiversitatSeguiment?: boolean,
        public aill?: boolean, //
        public beca?: boolean, //
        public serveisSocials?: boolean,
    // Tipus de PI
        public piCurricular?: boolean, //
        public piMetodologic?: boolean, //
        public piConductual?: boolean, //
    // Assignatures amb PI
        public piCatala?: boolean, //
        public piMates?: boolean, //
        public piCastellano?: boolean, //
        public piMedi?: boolean, //
        public piEducacioFisica?: boolean, //
        public piEducacioArtistica?: boolean, //
        public materialDiferenciat?: boolean,
        public adequacioContingutsMates?: boolean, //
        public adequacioContingutsCatala?: boolean, //
        public adequacioContingutsCastella?: boolean, //
        public adequacioContingutsMedi?: boolean, //
        public fullDerivacio?: boolean, //
        public fullDerivacioAutor?: string, //
        public fullDerivacioMotiu?: string, //
        public certificatDisminucio?: boolean,
        public percetatgeDisminucio?: string,
        public valoracioEap?: boolean, //
        public valoracioEapAny?: string, //
        public dictamen?: boolean, //
        public motiuDictamen?: string, //
    // Seguiment Serveis Externs
        public seguimentEap?: boolean, //
        public seguimentTsEap?: boolean, //
        public seguimentCredag?: boolean, //
        public seguimentCredv?: boolean, //
        public seguimentCsmij?: boolean, //
        public seguimentSeetdic?: boolean,
        public seguimentCdiap?: boolean,
    // Seguiment mèdic
        public seguimentPediatria?: boolean, //
        public seguimentNeuropediatria?: boolean, //
        public seguimentAltresEspecialitats?: string, // 
        public atencioServeisPrivats?: string, //
    // SEGUIMENT
        public segActuacions?: [{ date: string, body: string }],
        public segInformacioCAD?: [{ date: string, body: string }],
        public segAltresCoord?: [{ date: string, body: string }],
    // REUNIONS PARES
        public reunionsPares?: [{
            curs: string,
            date: string,
            convocada: string,
            assistencia: string,
            body: string,
            conclusions: string,
            composicio: string,
            creat: string,
            userMail: string,
            dataIso: Date
        }],
    // ASSISTÈNCIA
        public assist?: [{
            date: string,
            mati: string,
            tarda: string,
            justificant: string,
            dataIso: Date
        }],
    // MENJADOR
        public menjador?: [{
            menu: string,
            dataMen: string,
            dataIsoMen: Date
        }],
        public uid?: string,
        public serveisExternsSeguiment?: boolean,
    ) {}

    get imatgeURL() {
        if (!this.img) {
            return `${cloud_url}v1617550969/no-imatge_nwdrzz.jpg`;
        } else  {
            return `${cloud_url}${this.img}`;
        }
    }
}