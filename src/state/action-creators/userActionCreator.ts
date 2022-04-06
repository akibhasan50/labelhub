import { Dispatch } from "redux"
import { Auth } from "../action-types/userActionType"
import { Action } from "../actions/userAction"
import { UserService } from "../../services/userService"



export const loginRequest = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: Auth.LOGIN_REQUEST
        })
    }
}

export const loginSuccess = (data: any) => {
    console.log('data', data)
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: Auth.LOGIN_SUCCESS,
            payload: data
        })
    }
}

export const loginFailed = (error: any) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: Auth.LOGIN_FAILED,
            payload: error
        })
    }
}
debugger;
export const  fetchLogin = () => (dispatch: any) => {
    dispatch(loginRequest())
    try {
        UserService.getUserInformation()
            .then((res: any) => {
                const persons = res.data;
                console.log(persons);
                dispatch(loginSuccess(persons))
            })
    } catch (error) {
        console.log('error',error)
        dispatch(loginFailed(error))
    }
};
