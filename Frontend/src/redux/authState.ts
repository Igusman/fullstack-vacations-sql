import { createStore } from "redux";

export class AuthState {
    public token: string = '';
    public constructor() {
        this.token = localStorage.getItem('token') || ''
    }
}

export enum AuthActionType {
    signup = 'Signup',
    login = 'Login',
    loguot = 'Loguot'
}

export type AuthPayload = string
export interface AuthAction {
    type: AuthActionType,
    payload: AuthPayload
}

export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {
    const newState = { ...currentState }

    switch (action.type) {
        case AuthActionType.signup:
        case AuthActionType.login:
            newState.token = action.payload
            localStorage.setItem('token', newState.token)
            break
        case AuthActionType.loguot:
            newState.token = '';
            localStorage.removeItem('token');
            break
    }
    return newState
}

export const authStore = createStore(authReducer)


