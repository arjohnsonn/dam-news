import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBfwRj8eEfoX6ZbHstXstI1Bs9amVC3E2A',
  authDomain: 'bt-news-c4f55.firebaseapp.com',
  projectId: 'bt-news-c4f55',
  storageBucket: 'bt-news-c4f55.appspot.com',
  messagingSenderId: '417986650833',
  appId: '1:417986650833:web:47b3bdba6639f1487f5bf0',
  measurementId: 'G-68F2670RTS'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

// Export the Firestore DB so you can use it elsewhere
export { db };
