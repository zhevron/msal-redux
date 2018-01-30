import { Logger } from "msal";
import { User } from "msal/lib-commonjs/User";
export interface IMsalOptions {
    validateAuthority?: boolean;
    cacheLocation?: string;
    redirectUri?: string;
    postLogoutRedirectUri?: string;
    logger?: Logger;
    loadFrameTimeout?: number;
}
export interface IMsalState {
    accessToken?: string;
    user?: User;
}
