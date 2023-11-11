import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBA18dPzbFnwgYWkXmm1Kp_d1JGTABmhv8',
  authDomain: 'car-dealership-b29c0.firebaseapp.com',
  projectId: 'car-dealership-b29c0',
  storageBucket: 'car-dealership-b29c0.appspot.com',
  messagingSenderId: '388159575214',
  appId: '1:388159575214:web:2feede9ed8841c00ba093f',
  measurementId: 'G-4H8L20P41L',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const createUser = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

const signIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};
export { createUser, signIn };

const user = getAuth();
console.log(user.currentUser);
