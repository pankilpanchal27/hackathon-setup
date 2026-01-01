
// Import compatibility versions of Firebase to support the namespaced API (v8 style) used in the components
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdKovzaViBtvxsEu0md2ZZME8bE9do2jg",
  authDomain: "pankil-test-project.firebaseapp.com",
  projectId: "pankil-test-project",
  storageBucket: "pankil-test-project.firebasestorage.app",
  messagingSenderId: "366931501292",
  appId: "1:366931501292:web:fe63d1d3ffaca9d15d85c9",
  measurementId: "G-29XM0W8HNM"
};

// Initialize Firebase using the compat layer to resolve the 'initializeApp' property error on the default export
const app = firebase.initializeApp(firebaseConfig);
// Export compat auth to resolve the 'auth' property error and support methods like signInWithEmailAndPassword used in Login/Signup
export const auth = firebase.auth();
// Firestore is used with modular syntax in this project; the compat app instance is compatible with getFirestore
export const db = getFirestore(app);

export default app;
