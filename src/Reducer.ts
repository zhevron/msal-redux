import { Action } from "redux";

import * as Constants from "./Constants";
import { IMsalState } from "./Types";

function createInitialState(): IMsalState {
    return {};
}

export function msalReducer(state = createInitialState(), action: Action): IMsalState {
    switch (action.type) {
        case Constants.MSAL_ACCESS_TOKEN_RECEIVED:
            return {
                ...state,
                accessToken: (action as any).accessToken,
                user: (action as any).user,
            };

        case Constants.MSAL_SIGN_IN_FAILURE:
            return {
                ...state,
                user: null,
            };

        case Constants.MSAL_SIGN_OUT:
            return {
                ...state,
                user: null,
            };

        default:
            return state;
    }
}
