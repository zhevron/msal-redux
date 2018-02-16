import { Logger, UserAgentApplication } from "msal";
import { User } from "msal/lib-commonjs/User";
import { Action } from "redux";

export interface IMsalAccessTokenReceivedAction extends Action {
    accessToken: string;
    scopes: string[];
    user: IMsalUser;
}

export interface IMsalOptions {
    validateAuthority?: boolean;
    cacheLocation?: string;
    redirectUri?: string;
    postLogoutRedirectUri?: string;
    logger?: Logger;
    loadFrameTimeout?: number;
}

export interface IMsalSignInAction extends Action {
    popup?: boolean;
    scopes?: string[];
}

export interface IMsalSignInFailureAction extends Action {
    error: string;
}

export interface IMsalState {
    accessToken?: string;
    user?: IMsalUser;
}

export class IMsalUser extends User {
    public readonly roles: string[];

    public hasRole(role: string): boolean {
        return this.roles.indexOf(role) > -1;
    }
}
