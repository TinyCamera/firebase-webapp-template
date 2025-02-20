import { all, fork } from "redux-saga/effects";
import authSaga from "../features/auth/store/authSaga";
import { todosSaga } from "../features/todos/store/todosSaga";

export default function* rootSaga() {
  yield all([fork(authSaga), fork(todosSaga)]);
}
