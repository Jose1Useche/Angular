import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] LOGIN_START'
export const AUTHENTICATE_SUCCESS = '[Auth] LOGIN';
export const AUTHENTICATE_FAIL = '[Auth] LOGIN_FAIL';
export const SIGNUP_START = '[Auth] SIGNUP_START';
export const SIGNUP = '[Auth] SIGNUP';
export const LOGOUT = '[Auth] LOGOUT';

export class AuthenticateSuccess implements Action {
    readonly type = AUTHENTICATE_SUCCESS;

    constructor(public myPayload: { 
        email: string, 
        userId: string,
        token: string,
        expirationDate: Date 
    }) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;

    constructor(public myPayload: { email: string, password: string }) {} 
}

export class AuthenticateFail implements Action {
    readonly type = AUTHENTICATE_FAIL;

    constructor(public myPayload: string) {} 
}

export class SignupStart implements Action {
    readonly type = SIGNUP_START;

    constructor(public myPayload: { email: string, password: string }) {} 
}

export type AuthActions = 
    AuthenticateSuccess 
    | Logout 
    | LoginStart 
    | AuthenticateFail
    | SignupStart;