import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCI2PR-dPMyBsSl4vaRAAI5liRwb3viI08",
    authDomain: "bt-news-744b9.firebaseapp.com",
    projectId: "bt-news-744b9",
    storageBucket: "bt-news-744b9.firebasestorage.app",
    messagingSenderId: "242962821346",
    appId: "1:242962821346:web:862a42d36e62098c3caebb",
    measurementId: "G-G3D5MG5J6D"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

// Export the Firestore DB so you can use it elsewhere
export { db };

/**
 * 
 * // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCI2PR-dPMyBsSl4vaRAAI5liRwb3viI08",
  authDomain: "bt-news-744b9.firebaseapp.com",
  projectId: "bt-news-744b9",
  storageBucket: "bt-news-744b9.firebasestorage.app",
  messagingSenderId: "242962821346",
  appId: "1:242962821346:web:862a42d36e62098c3caebb",
  measurementId: "G-G3D5MG5J6D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 */
