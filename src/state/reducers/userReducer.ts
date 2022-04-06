import { Auth } from "../action-types/userActionType"
import { Action } from "../actions/userAction"

const initialState: any = '';
const userReducer = (state: any = initialState, action: Action): any => {
    switch (action.type){
        case Auth.LOGIN_REQUEST:
            return {
                ...state
            };
        case Auth.LOGIN_SUCCESS:
            return {
                ...state,
                payload: action.payload
            };
        case Auth.LOGIN_FAILED:
            return {
                ...state,
                payload: action.payload
            };
        default:
            return state
    }
}

export default userReducer
