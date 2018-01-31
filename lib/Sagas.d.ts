import { SagaIterator } from "redux-saga";
import * as Types from "./Types";
export declare function msalSaga(clientId: string, authority: string, options?: Types.IMsalOptions): SagaIterator;
