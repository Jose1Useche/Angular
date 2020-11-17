import { Actions, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';

export class AuthEffects {
    authLogin =  this.actions$.pipe( // ngrx/effects subscribes this observable for me.
        ofType(AuthActions.LOGIN_START)
    ); 

    constructor(private actions$: Actions) {}
}