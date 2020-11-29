import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
    user: User;
    authError: string;
    loading: boolean;
}

const initialState: State = {
    user: null,
    authError: null,
    loading: false
}

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.LOGIN:
            const user = new User(
                action.myPayload.email, 
                action.myPayload.userId, 
                action.myPayload.token, 
                action.myPayload.expirationDate
                );
            return {
                ...state,
                authError: null,
                user: user,
                loading: false
            };

        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            };

        case AuthActions.LOGIN_START:
            return {
                ...state,
                authError: null,
                loading: true
            }

        case AuthActions.LOGIN_FAIL:
            return {
                ...state,
                user: null,
                authError: action.myPayload,
                loading: false
            }
    
        default:
            return state;
    }
}