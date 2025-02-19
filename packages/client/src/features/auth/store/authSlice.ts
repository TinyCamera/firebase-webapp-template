import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@firebase-webapp-template/shared";

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInRequest(state) {
      state.loading = true;
      state.error = null;
    },
    signOutRequest(state) {
      state.loading = true;
      state.error = null;
    },
    authError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { setUser, signInRequest, signOutRequest, authError, clearError } =
  authSlice.actions;

export default authSlice.reducer;
