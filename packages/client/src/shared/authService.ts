import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  Timestamp,
  getFirestore,
} from "firebase/firestore";
import { auth } from "../config/firebase";

const db = getFirestore();

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  createdAt: number;
}

export const signUp = async (
  email: string,
  password: string,
  displayName?: string
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  if (displayName) {
    await updateProfile(userCredential.user, { displayName });
  }

  const profile: UserProfile = {
    uid: userCredential.user.uid,
    displayName: displayName || "Anonymous",
    email: userCredential.user.email || "",
    createdAt: Timestamp.now().toMillis(),
  };

  await createUserProfile(userCredential.user.uid, profile);

  return userCredential;
};

export const login = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  return signOut(auth);
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const subscribeToAuthChanges = (
  callback: (user: User | null) => void
) => {
  return onAuthStateChanged(auth, callback);
};

export const updateUserProfile = async (displayName: string) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No authenticated user");
  }

  await updateProfile(user, { displayName });

  const profile: UserProfile = {
    uid: user.uid,
    displayName,
    email: user.email || "",
    createdAt: Timestamp.now().toMillis(),
  };

  await updateUserProfileInFirestore(user.uid, profile);
};

export const createUserProfile = async (uid: string, profile: UserProfile) => {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, profile);
};

export const updateUserProfileInFirestore = async (
  uid: string,
  profile: Partial<UserProfile>
) => {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, profile, { merge: true });
};

export const getUserProfile = async (
  uid: string
): Promise<UserProfile | null> => {
  const userRef = doc(db, "users", uid);
  const userDoc = await getDoc(userRef);
  return userDoc.exists() ? (userDoc.data() as UserProfile) : null;
};
