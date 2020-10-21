export class User {
    constructor(
        public email: string, 
        public id: string, 
        private _token: string,
        private _tokenExpirationDate: Date
        ) {}

    get token() { //El get es una función especial que me permite usar a "token" como una propiedad. Es una propiedad que me permite 
                  //correr código cuando intento acceder a ella. Como es de tipo get pues solo puedo acceder a la informacion de 
                  //esta propiedad, pero no puedo asignarle valor ==> user.token = something.
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}