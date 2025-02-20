import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { todosApi } from "../api/todosApi";
import {
  createTodoFailure,
  createTodoStart,
  createTodoSuccess,
  deleteTodoFailure,
  deleteTodoStart,
  deleteTodoSuccess,
  fetchTodosFailure,
  fetchTodosStart,
  fetchTodosSuccess,
  updateTodoFailure,
  updateTodoStart,
  updateTodoSuccess,
} from "./todosSlice";
import { UpdateTodoDTO } from "../types";

function* fetchTodosSaga(): Generator<any, void, any> {
  try {
    const todos = yield call(todosApi.getTodos);
    yield put(fetchTodosSuccess(todos));
  } catch (error) {
    yield put(
      fetchTodosFailure(
        error instanceof Error ? error.message : "Failed to fetch todos"
      )
    );
  }
}

function* createTodoSaga(
  action: PayloadAction<{ title: string }>
): Generator<any, void, any> {
  try {
    const todo = yield call(todosApi.createTodo, action.payload);
    yield put(createTodoSuccess(todo));
  } catch (error) {
    yield put(
      createTodoFailure(
        error instanceof Error ? error.message : "Failed to create todo"
      )
    );
  }
}

function* updateTodoSaga(
  action: PayloadAction<{
    id: string;
    data: UpdateTodoDTO;
  }>
): Generator<any, void, any> {
  try {
    const todo = yield call(
      todosApi.updateTodo,
      action.payload.id,
      action.payload.data
    );
    yield put(updateTodoSuccess(todo));
  } catch (error) {
    yield put(
      updateTodoFailure(
        error instanceof Error ? error.message : "Failed to update todo"
      )
    );
  }
}

function* deleteTodoSaga(
  action: PayloadAction<string>
): Generator<any, void, any> {
  try {
    yield call(todosApi.deleteTodo, action.payload);
    yield put(deleteTodoSuccess(action.payload));
  } catch (error) {
    yield put(
      deleteTodoFailure(
        error instanceof Error ? error.message : "Failed to delete todo"
      )
    );
  }
}

export function* todosSaga() {
  yield takeLatest(fetchTodosStart.type, fetchTodosSaga);
  yield takeLatest(createTodoStart.type, createTodoSaga);
  yield takeLatest(updateTodoStart.type, updateTodoSaga);
  yield takeLatest(deleteTodoStart.type, deleteTodoSaga);
}
