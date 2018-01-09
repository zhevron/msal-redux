import * as Msal from "msal";
import * as React from "react";

export const MSAL_TOKEN_RECEIVED_SUCCESS: string;
export const MSAL_TOKEN_RECEIVED_ERROR: string;

export interface IMsalState {
    access_token?: string;
    id_token?: string;
    refresh_token?: string;
}

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
    constructor(props: IUserAgentApplicationProps);
    
    public loginRedirect(scopes?: string[], extraQueryParameters?: string): void;
    public loginPopup(scopes: string[], extraQueryParameters?: string): void;
    public logout(): void;
}
