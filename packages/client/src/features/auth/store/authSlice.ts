import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@firebase-webapp-template/shared";
import type { UserInfo as UserProfile } from "firebase/auth";

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  profile: UserProfile | null;
  profiles: Record<string, UserProfile>;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  profile: null,
  profiles: {},
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
    emailSignInRequest(
      state,
      _action: PayloadAction<{ email: string; password: string }>
    ) {
      state.loading = true;
      state.error = null;
    },
    emailSignUpRequest(
      state,
      _action: PayloadAction<{
        email: string;
        password: string;
        displayName: string;
      }>
    ) {
      state.loading = true;
      state.error = null;
    },
    googleSignInRequest(state) {
      state.loading = true;
      state.error = null;
    },
    githubSignInRequest(state) {
      state.loading = true;
      state.error = null;
    },
    passwordResetRequest(state, _action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    passwordResetSuccess(state) {
      state.loading = false;
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

export const {
  setUser,
  emailSignInRequest,
  emailSignUpRequest,
  googleSignInRequest,
  githubSignInRequest,
  passwordResetRequest,
  passwordResetSuccess,
  signOutRequest,
  authError,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
