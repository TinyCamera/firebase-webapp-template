import * as admin from "firebase-admin";

// Initialize Firebase Admin
const app = admin.initializeApp();

export const auth = app.auth();
export const db = app.firestore();

// Enable Firestore timestamp snapshots
db.settings({ ignoreUndefinedProperties: true });
