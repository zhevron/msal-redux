import { Logger } from "msal";
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
export declare class IMsalUser extends User {
    readonly roles: string[];
    hasRole(role: string): boolean;
}
