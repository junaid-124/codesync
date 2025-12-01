import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";  // ⭐ ADD THIS

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXB_LTQUhPjV_SqTv6QIFEOmvPIuvcxzE",
  authDomain: "codesync-bf41e.firebaseapp.com",
  projectId: "codesync-bf41e",
  storageBucket: "codesync-bf41e.firebasestorage.app",
  messagingSenderId: "709966735436",
  appId: "1:709966735436:web:467ff94553a4ba7e3eace9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exports
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);   // ⭐ REQUIRED FOR UPLOADING IMAGES
