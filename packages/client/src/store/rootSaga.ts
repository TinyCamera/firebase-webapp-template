import { all, fork } from "redux-saga/effects";
import authSaga from "../features/auth/store/authSaga";

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    // Add other sagas here
  ]);
}
