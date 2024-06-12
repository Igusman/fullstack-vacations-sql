import { AuthAction, AuthActionType, authStore } from '../redux/authState';
import axios from "axios";
import { appConfig } from "../utils/appConfig";
import { LoginCredentials } from '../models/loginModel';
import { SignupCredentials } from '../models/signupModel';


export const LoginService = async (loginCredentials: LoginCredentials): Promise<string> => {

    const response = await axios.post<string>(appConfig.authUrl.signin, loginCredentials)

    const token = response.data

    const action: AuthAction = {
        type: AuthActionType.login,
        payload: token
    }
    authStore.dispatch(action)

    return token
}

export const signupService = async (signupCredentials: SignupCredentials): Promise<string> => {

    const response = await axios.post<string>(appConfig.authUrl.signup, signupCredentials)

    const token = response.data

    const action: AuthAction = {
        type: AuthActionType.signup,
        payload: token
    }

    authStore.dispatch(action)

    return token
}

export const logoutService = () => {
    const action: AuthAction = {
        type: AuthActionType.loguot,
        payload: 'null'
    }
    authStore.dispatch(action)
}