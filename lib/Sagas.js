"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var msal_1 = require("msal");
var redux_saga_1 = require("redux-saga");
var effects_1 = require("redux-saga/effects");
var Constants = require("./Constants");
var userAgentApplication = null;
function accessTokenReceived(action) {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, redux_saga_1.delay(600000)];
            case 1:
                _a.sent();
                return [4 /*yield*/, effects_1.call(acquireNewAccessToken, action.scopes)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
function acquireNewAccessToken(scopes) {
    var accessToken, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 5]);
                return [4 /*yield*/, userAgentApplication.acquireTokenSilent(scopes, null, userAgentApplication.getUser())];
            case 1:
                accessToken = _a.sent();
                return [4 /*yield*/, effects_1.put({
                        type: Constants.MSAL_ACCESS_TOKEN_RECEIVED,
                        accessToken: accessToken,
                        scopes: scopes,
                        user: userAgentApplication.getUser(),
                    })];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3:
                error_1 = _a.sent();
                return [4 /*yield*/, effects_1.put({ type: Constants.MSAL_SIGN_IN_FAILURE, error: error_1 })];
            case 4:
                _a.sent();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}
function signIn(action) {
    var scopes, popup, accessToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                scopes = action.scopes || [userAgentApplication.clientId];
                if (!userAgentApplication.isCallback(window.location.hash)) return [3 /*break*/, 2];
                userAgentApplication._processCallBack(window.location.hash);
                return [4 /*yield*/, effects_1.put({ type: Constants.MSAL_CALLBACK_PROCESSED })];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                if (!userAgentApplication.getUser()) return [3 /*break*/, 4];
                return [4 /*yield*/, effects_1.call(acquireNewAccessToken, scopes)];
            case 3:
                _a.sent();
                return [3 /*break*/, 8];
            case 4:
                popup = action.popup || false;
                if (!popup) return [3 /*break*/, 7];
                return [4 /*yield*/, userAgentApplication.loginPopup(scopes)];
            case 5:
                accessToken = _a.sent();
                return [4 /*yield*/, effects_1.put({
                        type: Constants.MSAL_ACCESS_TOKEN_RECEIVED,
                        accessToken: accessToken,
                        scopes: scopes,
                        user: userAgentApplication.getUser(),
                    })];
            case 6:
                _a.sent();
                return [3 /*break*/, 8];
            case 7:
                userAgentApplication.loginRedirect(scopes);
                _a.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}
function signOut(action) {
    return __generator(this, function (_a) {
        if (userAgentApplication.getUser()) {
            userAgentApplication.logout();
        }
        return [2 /*return*/];
    });
}
function msalSaga(clientId, authority, options) {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userAgentApplication = new msal_1.UserAgentApplication(clientId, authority, null, options);
                return [4 /*yield*/, effects_1.all([
                        effects_1.takeLatest(Constants.MSAL_ACCESS_TOKEN_RECEIVED, accessTokenReceived),
                        effects_1.takeLatest(Constants.MSAL_SIGN_IN, signIn),
                        effects_1.takeLatest(Constants.MSAL_SIGN_OUT, signOut),
                    ])];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.msalSaga = msalSaga;
//# sourceMappingURL=Sagas.js.map