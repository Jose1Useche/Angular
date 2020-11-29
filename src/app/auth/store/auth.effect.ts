import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';

export interface AuthResponseData { 
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable() //no debe proveerse en root como otros injectables (o en mi caso agregarlos al app.Module). Para agregarlos al
              //app.Module se hace a través del EffectsModule en el app.Module
              //La razón de por qué usamos injectable acá es para poder usar lo que estamos injectando en el constructor:
              //(private actions$: Actions, private http: HttpClient)
export class AuthEffects {
    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START)
    );

    @Effect()
    authLogin =  this.actions$.pipe( // ngrx/effects subscribes this observable for me.
        ofType(AuthActions.LOGIN_START), //Éste tipo de accion es quien dispara a este efecto.Tambien pueden agregarse otras acciones
                                        //separandolos con coma.
        switchMap((authData: AuthActions.LoginStart) => { //switchMap Nos premite crear otro observable de un observable previo.
            return this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fireBaseAPIKeyEnvironment,
                {
                    email: authData.myPayload.email,
                    password: authData.myPayload.password,
                    returnSecureToken: true
                }
            ).pipe(
                map(resData => {
                    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
                    return new AuthActions.AuthenticateSuccess({
                        email: resData.email,
                        userId: resData.localId,
                        token: resData.idToken,
                        expirationDate: expirationDate
                    });
                }),
                catchError(errorRes => {
                    // ...
                    let errorMessage = 'An unknown error occurred!'
                    if(!errorRes.error || !errorRes.error.error) {
                        return of(new AuthActions.AuthenticateFail(errorMessage));
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
                    }
                    return of(new AuthActions.AuthenticateFail(errorMessage));
                }) 
            );
        }),

    );
    
    @Effect({ dispatch: false })
    authSuccess = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS), 
        tap(() => {
            this.router.navigate(['/']);
        })
    );

    constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}
}