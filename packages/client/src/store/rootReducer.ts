import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/store/authSlice";
import todosReducer from "../features/todos/store/todosSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  todos: todosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
