import { call, put, takeLatest } from "redux-saga/effects";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "../../../config/firebase";
import { setUser, signInRequest, signOutRequest, authError } from "./authSlice";
import { EventChannel, eventChannel } from "redux-saga";
import { User } from "@firebase-webapp-template/shared";

// Convert Firebase user to our User type
function mapFirebaseUser(firebaseUser: FirebaseUser): User {
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email || "",
    displayName: firebaseUser.displayName || undefined,
    photoURL: firebaseUser.photoURL || undefined,
  };
}

// Create auth state change channel
function createAuthChannel() {
  return eventChannel((emit) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        emit({ user });
      },
      (error) => {
        emit({ error });
      }
    );

    return unsubscribe;
  });
}

// Watch auth state changes
function* watchAuthStateChanged() {
  const channel: EventChannel<{ user: FirebaseUser | null; error?: Error }> =
    yield call(createAuthChannel);

  try {
    while (true) {
      const { user, error } = yield take(channel);
      if (error) {
        yield put(authError(error.message));
      } else {
        yield put(setUser(user ? mapFirebaseUser(user) : null));
      }
    }
  } finally {
    channel.close();
  }
}

// Sign in with Google
function* signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const result = yield call(signInWithPopup, auth, provider);
    yield put(setUser(mapFirebaseUser(result.user)));
  } catch (error) {
    yield put(authError((error as Error).message));
  }
}

// Sign out
function* signOut() {
  try {
    yield call(firebaseSignOut, auth);
    yield put(setUser(null));
  } catch (error) {
    yield put(authError((error as Error).message));
  }
}

// Root auth saga
export default function* authSaga() {
  yield takeLatest(signInRequest.type, signInWithGoogle);
  yield takeLatest(signOutRequest.type, signOut);
  yield fork(watchAuthStateChanged);
}
