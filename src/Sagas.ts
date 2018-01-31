import { Logger, UserAgentApplication } from "msal";
import { Action } from "redux";
import { delay, SagaIterator } from "redux-saga";
import { all, call, fork, put, select, takeLatest } from "redux-saga/effects";

import * as Constants from "./Constants";
import { IMsalOptions, IMsalState } from "./Types";

let userAgentApplication: UserAgentApplication = null;

function* accessTokenReceived(action: Action): any {
    yield delay(600000);
    yield call(acquireNewAccessToken, (action as any).scopes);
}

function* acquireNewAccessToken(scopes: string[]): SagaIterator {
    try {
        const accessToken: string = yield (userAgentApplication.acquireTokenSilent(
            [userAgentApplication.clientId],
            null,
            userAgentApplication.getUser(),
        ) as any);

        yield put({
            type: Constants.MSAL_ACCESS_TOKEN_RECEIVED,
            accessToken,
            scopes,
            user: userAgentApplication.getUser(),
        });
    } catch (error) {
        yield put({ type: Constants.MSAL_SIGN_IN_FAILURE, error });
    }
}

function* signIn(action: Action): SagaIterator {
    const scopes: string[] = (action as any).scopes || [userAgentApplication.clientId];

    if (userAgentApplication.isCallback(window.location.hash)) {
        userAgentApplication._processCallBack(window.location.hash);
        yield put({ type: Constants.MSAL_CALLBACK_PROCESSED });
    }

    if (userAgentApplication.getUser()) {
        yield call(acquireNewAccessToken, scopes);
    } else {
        const popup: boolean = (action as any).popup || false;

        if (popup) {
            const accessToken: string = yield (userAgentApplication.loginPopup(scopes) as any);

            yield put({
                type: Constants.MSAL_ACCESS_TOKEN_RECEIVED,
                accessToken,
                scopes,
                user: userAgentApplication.getUser(),
            });
        } else {
            userAgentApplication.loginRedirect(scopes);
        }
    }
}

function* signOut(action: Action): SagaIterator {
    if (userAgentApplication.getUser()) {
        userAgentApplication.logout();
    }
}

export function* msalSaga(clientId: string, authority: string, options?: IMsalOptions): SagaIterator {
    userAgentApplication = new UserAgentApplication(clientId, authority, null, options);

    yield all([
        takeLatest(Constants.MSAL_ACCESS_TOKEN_RECEIVED, accessTokenReceived),
        takeLatest(Constants.MSAL_SIGN_IN, signIn),
        takeLatest(Constants.MSAL_SIGN_OUT, signOut),
    ]);
}
