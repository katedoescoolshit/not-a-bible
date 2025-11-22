// Firebase Configuration for Not A Bible
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzNF9t0BlPNV5LlVGpPb3vcr_jFPBj-1M",
  authDomain: "not-a-bible.firebaseapp.com",
  projectId: "not-a-bible",
  storageBucket: "not-a-bible.firebasestorage.app",
  messagingSenderId: "914130555932",
  appId: "1:914130555932:web:3694d0854cfca0c4197bd9",
  measurementId: "G-714DS8BM1F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);

export { app, analytics, db, storage, functions };
