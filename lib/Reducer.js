"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MSAL_TOKEN_RECEIVED_SUCCESS = "@@msal/token_received_success";
exports.MSAL_TOKEN_RECEIVED_ERROR = "@@msal/token_received_error";
exports.initialState = {
    access_token: null,
    id_token: null,
    refresh_token: null,
};
function msalReducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    console.log(action);
    switch (action.type) {
        case exports.MSAL_TOKEN_RECEIVED_SUCCESS:
        //
        case exports.MSAL_TOKEN_RECEIVED_ERROR:
        //
        default:
            return state;
    }
}
exports.msalReducer = msalReducer;
//# sourceMappingURL=Reducer.js.map