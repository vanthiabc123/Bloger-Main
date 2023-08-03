import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = { 
  apiKey : "AIzaSyCYEHriwNOiv9O_sbh1CCdlb0cQd3MaHLo" , 
  authDomain : "blog-7d7e9.firebaseapp.com" , 
  projectId : "blog-7d7e9" , 
  storageBucket : "blog-7d7e9.appspot.com" , 
  messagingSenderId : "397849763821" , 
  appId : "1:397849763821:web:b3d4786fe2d45e745ed1e4" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
