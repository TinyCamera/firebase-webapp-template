import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo, TodosState } from "../types";

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
  filter: "all",
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Fetch todos
    fetchTodosStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTodosSuccess: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
      state.loading = false;
    },
    fetchTodosFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Create todo
    createTodoStart: (state, _action: PayloadAction<{ title: string }>) => {
      state.loading = true;
      state.error = null;
    },
    createTodoSuccess: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
      state.loading = false;
    },
    createTodoFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update todo
    updateTodoStart: (
      state,
      _action: PayloadAction<{
        id: string;
        data: { title?: string; completed?: boolean };
      }>
    ) => {
      state.loading = true;
      state.error = null;
    },
    updateTodoSuccess: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
      state.loading = false;
    },
    updateTodoFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete todo
    deleteTodoStart: (state, _action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    deleteTodoSuccess: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      state.loading = false;
    },
    deleteTodoFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Filter todos
    setFilter: (
      state,
      action: PayloadAction<"all" | "active" | "completed">
    ) => {
      state.filter = action.payload;
    },
  },
});

export const {
  fetchTodosStart,
  fetchTodosSuccess,
  fetchTodosFailure,
  createTodoStart,
  createTodoSuccess,
  createTodoFailure,
  updateTodoStart,
  updateTodoSuccess,
  updateTodoFailure,
  deleteTodoStart,
  deleteTodoSuccess,
  deleteTodoFailure,
  setFilter,
} = todosSlice.actions;

export default todosSlice.reducer;
