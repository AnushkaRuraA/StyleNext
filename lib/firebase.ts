import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";
import { getAuth, Auth } from "firebase/auth";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

// Check if we have the minimum config needed to initialize
const isConfigValid = !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID && !!process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

let app: FirebaseApp;
let rtdb: Database;
let auth: Auth;
let storage: FirebaseStorage;

if (typeof window !== "undefined" || isConfigValid) {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  rtdb = getDatabase(app);
  auth = getAuth(app);
  storage = getStorage(app);
} else {
  // During build time on Vercel, if env vars are missing, we provide dummy objects
  // to prevent the app from crashing during module evaluation.
  // The pages using these will still fail if they try to fetch data,
  // but the build process will be able to complete if handled in the services.
  app = {} as FirebaseApp;
  rtdb = {} as Database;
  auth = {} as Auth;
  storage = {} as FirebaseStorage;
}

export { app, rtdb, auth, storage };
