

export class Usuari {
    constructor(
        public email: string,
        public password: string,
        public nom: string,
        public cognom: string,
        public mestre: string,
        public nivell: string,
        public classe: string,
        public centre: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public estat?: boolean,
        public lastLogin?: string

    ) {}
}
