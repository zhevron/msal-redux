import { Action } from "redux";

import * as Constants from "./Constants";
import * as Types from "./Types";

function createInitialState(): Types.IMsalState {
    return {};
}

export function msalReducer(state: Types.IMsalState | undefined, action: Action): Types.IMsalState {
    switch (action.type) {
        case Constants.MSAL_ACCESS_TOKEN_RECEIVED:
            const accessTokenReceivedAction = action as Types.IMsalAccessTokenReceivedAction;

            return {
                ...state,
                accessToken: accessTokenReceivedAction.accessToken,
                user: accessTokenReceivedAction.user,
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
            return state || createInitialState();
    }
}
