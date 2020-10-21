import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData { //Esto como que no es muy necesario porque estoy viendo los mismos resultados sin esta interfaz...
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable()
export class AuthService {
    user = new Subject<User>();

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
            ).pipe(catchError(this.handleError), tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDtcgVJVK5HqPAkfmQy-Q72jR8d3oVxgdc',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000
        );
            const user = new User(
                email, 
                userId, 
                token, 
                expirationDate
            );
            this.user.next(user);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!'
        if(!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This Email exists already!';
                console.log(errorRes);
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'The email doesn\'t\ exist!';
                console.log(errorRes);
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is invalid!'
                console.log(errorRes);
                break;
            default:
                errorMessage = 'Error that is out from del switch case...'
                console.log(errorRes);
          }
        return throwError(errorMessage);
    }

}