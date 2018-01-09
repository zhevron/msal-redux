import * as Msal from "msal";
import * as PropTypes from "prop-types";
import * as React from "react";

import { MSAL_TOKEN_RECEIVED_ERROR, MSAL_TOKEN_RECEIVED_SUCCESS } from "./Reducer";

export interface IMsalOptions {
    validateAuthority?: boolean;
    cacheLocation?: string;
    redirectUri?: string;
    postLogoutRedirectUri?: string;
    logger?: Msal.Logger;
    loadFrameTimeout?: number;
}

export interface IUserAgentApplicationProps {
    clientId: string;
    authority?: string;
    options?: IMsalOptions;
    store?: any;
}

export interface IUserAgentApplicationState {
    msalApp: Msal.UserAgentApplication;
    store: any;
}

export class UserAgentApplication extends React.Component<IUserAgentApplicationProps, IUserAgentApplicationState> {
    public static propTypes = {
        clientId: PropTypes.string.isRequired,
        authority: PropTypes.string,
        options: PropTypes.object,
        store: PropTypes.object,
    };

    public static contextTypes = {
        store: PropTypes.object,
    };

    constructor(props: IUserAgentApplicationProps) {
        super(props);

        this._tokenReceivedCallback = this._tokenReceivedCallback.bind(this);

        this.state = {
            msalApp: new Msal.UserAgentApplication(
                props.clientId,
                props.authority,
                this._tokenReceivedCallback,
                props.options,
            ),
            store: props.store || this.context.store,
        };
    }

    public loginRedirect(scopes?: string[], extraQueryParameters?: string): void {
        this.state.msalApp.loginRedirect(scopes, extraQueryParameters);
    }

    public loginPopup(scopes: string[], extraQueryParameters?: string): void {
        this.state.msalApp.loginPopup(scopes, extraQueryParameters);
    }

    public logout(): void {
        this.state.msalApp.logout();
    }

    private _tokenReceivedCallback(errorDesc: string, token: string, error: string, tokenType: string): void {
        if (error) {
            this.state.store.dispatch({
                type: MSAL_TOKEN_RECEIVED_ERROR,
                error,
                errorDesc,
            });
        } else {
            this.state.store.dispatch({
                type: MSAL_TOKEN_RECEIVED_SUCCESS,
                token,
                tokenType,
            });
        }
    }
}
