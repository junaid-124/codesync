import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// PASTE YOUR FIREBASE CONFIG OBJECT FROM THE CONSOLE HERE
const firebaseConfig = {
  apiKey: "AIzaSyAkqjJXV7QWxZQLWEiTYRiXDBsb4sTqKPM",
  authDomain: "codesync-b3e17.firebaseapp.com",
  projectId: "codesync-b3e17",
  storageBucket: "codesync-b3e17.firebasestorage.app",
  messagingSenderId: "841727589093",
  appId: "1:841727589093:web:c31f0d32ab2d4d30f3720c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);
export const db = getFirestore(app);