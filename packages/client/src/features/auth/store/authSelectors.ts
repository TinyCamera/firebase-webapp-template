import type { UserInfo } from "firebase/auth";
import type { RootState } from "../../../store/rootReducer";
import type { User } from "@firebase-webapp-template/shared";

export const selectIsAuthenticated = (state: RootState): boolean =>
  state.auth.user !== null;

export const selectAuthLoading = (state: RootState): boolean =>
  state.auth.loading;

export const selectAuthError = (state: RootState): string | null =>
  state.auth.error;

export const selectUser = (state: RootState): User | null => state.auth.user;

export const selectUserId = (state: RootState): string | undefined =>
  state.auth.user?.id;

export const selectToken = (state: RootState): string | null | undefined =>
  state.auth.user?.token;

export const selectUserProfile = (state: RootState): UserInfo | null =>
  state.auth.profile;

export const selectProfileByUserId = (
  state: RootState,
  userId: string | null
): UserInfo | null => {
  if (!userId) return null;
  // If this is the current user's profile
  if (state.auth.user?.id === userId) {
    return state.auth.profile;
  }
  // For other users' profiles
  if (!userId || !state.auth.profiles) return null;
  return state.auth.profiles[userId] || null;
};

export const selectDisplayName = (state: RootState): string => {
  return (
    state.auth.profile?.displayName ??
    state.auth.user?.displayName ??
    "Anonymous"
  );
};
