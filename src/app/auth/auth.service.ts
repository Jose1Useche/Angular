import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { environment } from '../../environments/environment';

import { User } from './user.model';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { Action } from 'rxjs/internal/scheduler/Action';

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
    // user = new Subject<User>();
    // token: string = null;
    user = new BehaviorSubject<User>(null);//A BehaviorSubject holds one value. When it is subscribed it emits the value immediately. 
                                           //A Subject doesn't hold a value.
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) {}

    signup(email: string, password: string) {
        // El accounts:signUp?key se consigue en la configuración del Fire Base
        return this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.fireBaseAPIKeyEnvironment,
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
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fireBaseAPIKeyEnvironment,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string; 
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userDataJose'));
        if(!userData) {
            return;
        }

        const loadedUser = new User(
            userData.email,
            userData.id, 
            userData._token,
            new Date(userData._tokenExpirationDate)
            );

        if(loadedUser.token) {
            // this.user.next(loadedUser);
            this.store.dispatch(new AuthActions.Login({ 
                email: loadedUser.email, 
                userId: loadedUser.id,
                token: loadedUser.token,
                expirationDate: new Date(userData._tokenExpirationDate)
            }));
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout() {
        // this.user.next(null);
        this.store.dispatch(new AuthActions.Logout());
        this.router.navigate(['/auth']);
        // localStorage.clear(); //Con esto limpias todo el localStorage
        localStorage.removeItem('userDataJose');
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        console.log(expirationDuration);
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
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
            // this.user.next(user);
            this.store.dispatch(new AuthActions.Login({
                email: email,
                userId: userId,
                token: token,
                expirationDate: expirationDate
            }))
            this.autoLogout(expiresIn * 1000);
            //esta propiedad me permite guardar data en el localStorage (en el browser)
            localStorage.setItem('userDataJose', JSON.stringify(user)); //Transforma el JS Object en un string
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