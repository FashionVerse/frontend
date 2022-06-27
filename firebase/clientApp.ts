import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 
// Initialize Firebase
const app = initializeApp ({
  apiKey: "AIzaSyCiCP3LNPHbjh4JLvXpT1Bu0e17BPadZ5U",
  authDomain: "fashionverse-77907.firebaseapp.com",
  projectId: "fashionverse-77907",
  storageBucket: "fashionverse-77907.appspot.com",
  messagingSenderId: "181416164068",
  appId: "1:181416164068:web:dd6ab504703af767e28af1",
  measurementId: "G-1K0L5SXBQP"
});
 
// Firebase storage reference
const storage = getStorage(app);
export default storage;