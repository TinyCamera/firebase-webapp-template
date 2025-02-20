import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../store/rootReducer";
import { Todo } from "../types";

export const selectTodosState = (state: RootState) => state.todos;

export const selectTodos = createSelector(
  selectTodosState,
  (state) => state.todos
);

export const selectTodosLoading = createSelector(
  selectTodosState,
  (state) => state.loading
);

export const selectTodosError = createSelector(
  selectTodosState,
  (state) => state.error
);

export const selectTodosFilter = createSelector(
  selectTodosState,
  (state) => state.filter
);

export const selectFilteredTodos = createSelector(
  [selectTodos, selectTodosFilter],
  (todos: Todo[], filter: "all" | "active" | "completed") => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }
);
