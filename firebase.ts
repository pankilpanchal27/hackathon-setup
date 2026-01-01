
import firebase from 'firebase/app';
import 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6jvyfu3awqwPfstwIP753tZXpDd8zZzo",
  authDomain: "pankil-test-project.firebaseapp.com",
  projectId: "pankil-test-project",
  storageBucket: "pankil-test-project.firebasestorage.app",
  messagingSenderId: "366931501292",
  appId: "1:366931501292:web:fe63d1d3ffaca9d15d85c9",
  measurementId: "G-29XM0W8HNM"
};

// Initialize Firebase using namespaced style to fix 'initializeApp' export error
const app = firebase.initializeApp(firebaseConfig);
// Use namespaced auth to fix 'getAuth' export error
export const auth = firebase.auth();
// Firestore seems to work with modular imports in this environment, so keeping it
export const db = getFirestore(app);
export default app;
