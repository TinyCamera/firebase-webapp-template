import { call, put, takeLatest, take, fork } from "redux-saga/effects";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "../../../config/firebase";
import {
  setUser,
  googleSignInRequest,
  githubSignInRequest,
  emailSignInRequest,
  emailSignUpRequest,
  passwordResetRequest,
  passwordResetSuccess,
  signOutRequest,
  authError,
} from "./authSlice";
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
function* watchAuthStateChanged(): Generator {
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

// Email sign in
function* signInWithEmail(
  action: ReturnType<typeof emailSignInRequest>
): Generator {
  try {
    const { email, password } = action.payload;
    const result = yield call(
      signInWithEmailAndPassword,
      auth,
      email,
      password
    );
    yield put(setUser(mapFirebaseUser(result.user)));
  } catch (error) {
    yield put(authError((error as Error).message));
  }
}

// Email sign up
function* signUpWithEmail(
  action: ReturnType<typeof emailSignUpRequest>
): Generator {
  try {
    const { email, password, displayName } = action.payload;
    const result = yield call(
      createUserWithEmailAndPassword,
      auth,
      email,
      password
    );

    // Update profile with display name
    yield call(updateProfile, result.user, { displayName });
    yield put(setUser(mapFirebaseUser(result.user)));
  } catch (error) {
    yield put(authError((error as Error).message));
  }
}

// Google sign in
function* signInWithGoogle(): Generator {
  try {
    const provider = new GoogleAuthProvider();
    const result = yield call(signInWithPopup, auth, provider);
    yield put(setUser(mapFirebaseUser(result.user)));
  } catch (error) {
    yield put(authError((error as Error).message));
  }
}

// GitHub sign in
function* signInWithGithub(): Generator {
  try {
    const provider = new GithubAuthProvider();
    const result = yield call(signInWithPopup, auth, provider);
    yield put(setUser(mapFirebaseUser(result.user)));
  } catch (error) {
    yield put(authError((error as Error).message));
  }
}

// Password reset
function* resetPassword(
  action: ReturnType<typeof passwordResetRequest>
): Generator {
  try {
    yield call(sendPasswordResetEmail, auth, action.payload);
    yield put(passwordResetSuccess());
  } catch (error) {
    yield put(authError((error as Error).message));
  }
}

// Sign out
function* signOut(): Generator {
  try {
    yield call(firebaseSignOut, auth);
    yield put(setUser(null));
  } catch (error) {
    yield put(authError((error as Error).message));
  }
}

// Root auth saga
export default function* authSaga(): Generator {
  yield takeLatest(emailSignInRequest.type, signInWithEmail);
  yield takeLatest(emailSignUpRequest.type, signUpWithEmail);
  yield takeLatest(googleSignInRequest.type, signInWithGoogle);
  yield takeLatest(githubSignInRequest.type, signInWithGithub);
  yield takeLatest(passwordResetRequest.type, resetPassword);
  yield takeLatest(signOutRequest.type, signOut);
  yield fork(watchAuthStateChanged);
}
