import { Auth } from "../action-types/userActionType"

interface LoginRequestAction {
    type: Auth.LOGIN_REQUEST
}

interface LoginSuccessAction {
    type: Auth.LOGIN_SUCCESS,
    payload: any
}

interface LoginFailedActionAction {
    type: Auth.LOGIN_FAILED,
    payload: any
}

export type Action = LoginRequestAction | LoginSuccessAction | LoginFailedActionAction;
