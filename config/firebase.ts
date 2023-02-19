// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMFjh7LMqccGTDH2wy-_cAQ4_6L_moJgw",
  authDomain: "anyrent-a10b3.firebaseapp.com",
  projectId: "anyrent-a10b3",
  storageBucket: "anyrent-a10b3.appspot.com",
  messagingSenderId: "251775127804",
  appId: "1:251775127804:web:64b0c49b98cca75c640779",
  measurementId: "G-KC4LR0TSYN"
};

// Initialize Firebase
initializeApp(firebaseConfig);
// Get authentication
export const auth = getAuth();

// Get database
export const database = getFirestore();

// get storage 
export const storage = getStorage();

