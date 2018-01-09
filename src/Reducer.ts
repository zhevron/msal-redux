import * as Msal from "msal";
import { Action } from "redux";

export const MSAL_TOKEN_RECEIVED_SUCCESS = "@@msal/token_received_success";
export const MSAL_TOKEN_RECEIVED_ERROR = "@@msal/token_received_error";

export interface IMsalState {
    access_token?: string;
    id_token?: string;
    refresh_token?: string;
}

export const initialState: IMsalState = {
    access_token: null,
    id_token: null,
    refresh_token: null,
};

export function msalReducer(state = initialState, action: Action): IMsalState {
    console.log(action);

    switch (action.type) {
        case MSAL_TOKEN_RECEIVED_SUCCESS:
            //

        case MSAL_TOKEN_RECEIVED_ERROR:
            //

        default:
            return state;
    }
}
