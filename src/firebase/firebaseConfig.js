import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAtFN5Pl44DU1RZNDhRCoFrIZH94S4kCGk",
  authDomain: "fir-639c9.firebaseapp.com",
  projectId: "fir-639c9",
  storageBucket: "fir-639c9.appspot.com",
  messagingSenderId: "869329268748",
  appId: "1:869329268748:web:419622c9a590af00397e29",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
