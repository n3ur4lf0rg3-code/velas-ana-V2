import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApD7uzHwtttD35lO6pojOXk-h1I14RpOQ",
  authDomain: "velas-ana.firebaseapp.com",
  projectId: "velas-ana",
  storageBucket: "velas-ana.firebasestorage.app",
  messagingSenderId: "341676275890",
  appId: "1:341676275890:web:b28a3f21832b585ce771ab",
  measurementId: "G-RW3L1V61ZG",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
