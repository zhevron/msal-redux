"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Msal = require("msal");
var PropTypes = require("prop-types");
var React = require("react");
var Reducer_1 = require("./Reducer");
var UserAgentApplication = /** @class */ (function (_super) {
    __extends(UserAgentApplication, _super);
    function UserAgentApplication(props) {
        var _this = _super.call(this, props) || this;
        _this._tokenReceivedCallback = _this._tokenReceivedCallback.bind(_this);
        _this.state = {
            msalApp: new Msal.UserAgentApplication(props.clientId, props.authority, _this._tokenReceivedCallback, props.options),
            store: props.store || _this.context.store,
        };
        return _this;
    }
    UserAgentApplication.prototype.loginRedirect = function (scopes, extraQueryParameters) {
        this.state.msalApp.loginRedirect(scopes, extraQueryParameters);
    };
    UserAgentApplication.prototype.loginPopup = function (scopes, extraQueryParameters) {
        this.state.msalApp.loginPopup(scopes, extraQueryParameters);
    };
    UserAgentApplication.prototype.logout = function () {
        this.state.msalApp.logout();
    };
    UserAgentApplication.prototype._tokenReceivedCallback = function (errorDesc, token, error, tokenType) {
        if (error) {
            this.state.store.dispatch({
                type: Reducer_1.MSAL_TOKEN_RECEIVED_ERROR,
                error: error,
                errorDesc: errorDesc,
            });
        }
        else {
            this.state.store.dispatch({
                type: Reducer_1.MSAL_TOKEN_RECEIVED_SUCCESS,
                token: token,
                tokenType: tokenType,
            });
        }
    };
    UserAgentApplication.propTypes = {
        clientId: PropTypes.string.isRequired,
        authority: PropTypes.string,
        options: PropTypes.object,
        store: PropTypes.object,
    };
    UserAgentApplication.contextTypes = {
        store: PropTypes.object,
    };
    return UserAgentApplication;
}(React.Component));
exports.UserAgentApplication = UserAgentApplication;
//# sourceMappingURL=UserAgentApplication.js.map