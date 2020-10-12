import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
            ).pipe(catchError(errorRes => {
                let errorMessage = 'An unknown error occurred!'
                if(!errorRes.error || !errorRes.error.error) {
                    return throwError(errorMessage);
                }
                switch (errorRes.error.error.message) {
                    case 'EMAIL_EXISTS':
                      errorMessage = 'This Email exists already!';
                  }
                return throwError(errorMessage);
            }));
    }

}