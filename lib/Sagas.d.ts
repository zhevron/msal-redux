import { SagaIterator } from "redux-saga";
import { IMsalOptions } from "./Types";
export declare function msalSaga(clientId: string, authority: string, options?: IMsalOptions): SagaIterator;
