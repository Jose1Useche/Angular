import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import * as AuthActions from './auth.actions';

export interface AuthResponseData { 
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

export class AuthEffects {
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
                    return of(new AuthActions.Login({
                        email: resData.email,
                        userId: resData.localId,
                        token: resData.idToken,
                        expirationDate: expirationDate
                    }));
                }),
                catchError(error => {
                    // ...
                    return of();
                }) 
            );
        }),

    ); 

    constructor(private actions$: Actions, private http: HttpClient) {}
}