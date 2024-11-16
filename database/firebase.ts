// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDmxpaUdpMpwfhwP9h0BFZ_Uw0Xx0iAu3M",
  authDomain: "devheroes-startup.firebaseapp.com",
  projectId: "devheroes-startup",
  storageBucket: "devheroes-startup.appspot.com",
  messagingSenderId: "314825777364",
  appId: "1:314825777364:web:78841b3732efa4e75d1b41",
  measurementId: "G-T3535DH5W0"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIREBASE_AUTH= getAuth(FIREBASE_APP)
export const FIRESTORE_DB = getFirestore()