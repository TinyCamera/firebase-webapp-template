import request from "supertest";
import * as admin from "firebase-admin";

// Configure emulator hosts
process.env.FIRESTORE_EMULATOR_HOST = "127.0.0.1:8081";
process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9098";

// Set FIREBASE_CONFIG env var for functions emulator
process.env.FIREBASE_CONFIG = JSON.stringify({
  projectId: "your-firebase-project-id-24121",
});

export const API_BASE =
  "http://127.0.0.1:5001/your-firebase-project-id-24121/us-central1/api";

export const AUTH_BASE = "http://127.0.0.1:9098";

export const withAuth = (req: request.Test, token: string) => {
  return req.set("Authorization", `Bearer ${token}`);
};

export const initializeFirebase = async () => {
  admin.initializeApp();
  return admin.firestore();
};

export const createTestUser = async () => {
  const signUpResponse = await request(AUTH_BASE)
    .post("/identitytoolkit.googleapis.com/v1/accounts:signUp?key=fake-api-key")
    .send({
      email: `user_${Math.random().toString(36).substring(2, 15)}@example.com`,
      password: "userPassword",
      returnSecureToken: true,
    });
  return {
    token: signUpResponse.body.idToken,
    userId: (await admin.auth().verifyIdToken(signUpResponse.body.idToken)).uid,
  };
};
