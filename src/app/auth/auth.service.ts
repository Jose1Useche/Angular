import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

interface AuthResponseData { //Esto como que no es muy necesario porque estoy viendo los mismos resultados sin esta interfaz...
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {}

    signup(email: string, password: string) {
        // El accounts:signUp?key se consigue en la configuración del Fire Base
        return this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDtcgVJVK5HqPAkfmQy-Q72jR8d3oVxgdc',
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                }
            );
    }

}