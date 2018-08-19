"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Constants = require("./Constants");
function createInitialState() {
    return {};
}
function msalReducer(state, action) {
    switch (action.type) {
        case Constants.MSAL_ACCESS_TOKEN_RECEIVED:
            var accessTokenReceivedAction = action;
            return __assign({}, state, { accessToken: accessTokenReceivedAction.accessToken, user: accessTokenReceivedAction.user });
        case Constants.MSAL_SIGN_IN_FAILURE:
            return __assign({}, state, { user: null });
        case Constants.MSAL_SIGN_OUT:
            return __assign({}, state, { user: null });
        default:
            return state || createInitialState();
    }
}
exports.msalReducer = msalReducer;
//# sourceMappingURL=Reducer.js.map