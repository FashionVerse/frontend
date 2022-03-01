import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCiCP3LNPHbjh4JLvXpT1Bu0e17BPadZ5U",
  authDomain: "fashionverse-77907.firebaseapp.com",
  projectId: "fashionverse-77907",
  storageBucket: "fashionverse-77907.appspot.com",
  messagingSenderId: "181416164068",
  appId: "1:181416164068:web:dd6ab504703af767e28af1",
  measurementId: "G-1K0L5SXBQP"
};

// Initialize Firebase
let analytics; let firestore;
if (firebaseConfig?.projectId) {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  if (app.name && typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }

  // Access Firebase services using shorthand notation
  firestore = getFirestore();
}

export default firestore;