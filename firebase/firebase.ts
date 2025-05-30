
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from "firebase/auth"

import {
    getFirestore,
    addDoc,
    getDocs,
    getDoc,
    collection,
    query,
    where,
    updateDoc,
    deleteDoc,
    Timestamp,
    serverTimestamp,
    setDoc,
    doc
} from "firebase/firestore";

// import { doc } from "firebase/firestore";


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    db,
    addDoc,
    Timestamp,
    getDocs,
    getDoc,
    collection,
    query,
    where,
    updateDoc,
    deleteDoc,
    serverTimestamp,
    setDoc,
    doc
}
