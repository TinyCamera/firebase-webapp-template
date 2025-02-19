import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/store/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
